import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import adminApi from '@api/adminApi';
import { createMessage } from '@helper/stringAndDataHelpers';

const adminOrderSlice = createSlice({
    name: 'adminOrder',
    initialState: {
        isOrderLoading: true,
        orders: [],
        pagination: {},
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getOrders.fulfilled, (state, action) => {
                state.isOrderLoading = false;
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
                state => {
                    state.isOrderLoading = false;
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
                    state.isOrderLoading = true;
                }
            )
            .addMatcher(
                isAnyOf(
                    getOrders.rejected,
                    putOrderById.rejected,
                    deleteOrderById.rejected,
                    deleteOrders.rejected
                ),
                state => {
                    state.isOrderLoading = false;
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
        try {
            const res = await adminApi.orders.putOrderById(id, body);
            createMessage(dispatch, res.data.success, res.data.message);

            dispatch(getOrders(currentPage));
        } catch (error) {
            createMessage(dispatch, false, error?.response?.data?.message);
        }
    }
);

export const deleteOrderById = createAsyncThunk(
    'adminOrder/deleteOrderById',
    async (id, { dispatch }) => {
        try {
            const res = await adminApi.orders.deleteOrderById(id);
            createMessage(dispatch, res.data.success, res.data.message);

            dispatch(getOrders());
        } catch (error) {
            createMessage(dispatch, false, error?.response?.data?.message);
        }
    }
);

export const deleteOrders = createAsyncThunk(
    'adminOrder/deleteOrders',
    async (_, { dispatch }) => {
        try {
            const res = await adminApi.orders.deleteOrders();
            createMessage(dispatch, res.data.success, res.data.message);

            dispatch(getOrders());
        } catch (error) {
            createMessage(dispatch, false, error?.response?.data?.message);
        }
    }
);

export default adminOrderSlice.reducer;
