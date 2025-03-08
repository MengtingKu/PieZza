import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import adminApi from '@api/adminApi';

const adminOrderSlice = createSlice({
    name: 'adminOrder',
    initialState: {
        orders: [],
        isOrderLoading: false,
        message: null,
        success: null,
        pagination: {},
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orders = action.payload.orders;
                state.pagination = action.payload.pagination;
            })
            .addMatcher(
                isAnyOf(
                    getOrders.fulfilled,
                    putOrderById.fulfilled,
                    deleteOrderById.fulfilled,
                    deleteOrders.fulfilled
                ),
                (state, action) => {
                    state.isLoading = false;
                    state.success = action.payload.success;
                    state.message = action.payload.message;
                }
            )
            .addMatcher(
                isAnyOf(
                    getOrders.pending,
                    putOrderById.pending,
                    deleteOrderById.pending,
                    deleteOrders.pending
                ),
                state => {
                    state.isLoading = true;
                    state.message = null;
                }
            )
            .addMatcher(
                isAnyOf(
                    getOrders.rejected,
                    putOrderById.rejected,
                    deleteOrderById.rejected,
                    deleteOrders.rejected
                ),
                (state, action) => {
                    state.isLoading = false;
                    state.message = action.error.message;
                }
            );
    },
});

export const getOrders = createAsyncThunk(
    'adminOrder/getOrders',
    async (page = 1) => {
        const res = await adminApi.orders.getOrders(page);

        return {
            orders: res.data.orders,
            pagination: res.data.pagination,
        };
    }
);

export const putOrderById = createAsyncThunk(
    'adminOrder/putOrderById',
    async ({ id, params, currentPage }, { dispatch }) => {
        const body = {
            data: params,
        };
        const res = await adminApi.orders.putOrderById(id, body);
        dispatch(getOrders(currentPage));

        return {
            success: res.data.success,
            message: res.data.message,
        };
    }
);

export const deleteOrderById = createAsyncThunk(
    'adminOrder/deleteOrderById',
    async (id, { dispatch }) => {
        const res = await adminApi.orders.deleteOrderById(id);
        dispatch(getOrders());

        return {
            success: res.data.success,
            message: res.data.message,
        };
    }
);

export const deleteOrders = createAsyncThunk(
    'adminOrder/deleteOrders',
    async (_, { dispatch }) => {
        const res = await adminApi.orders.deleteOrders();
        dispatch(getOrders());

        return {
            success: res.data.success,
            message: res.data.message,
        };
    }
);

export default adminOrderSlice.reducer;
