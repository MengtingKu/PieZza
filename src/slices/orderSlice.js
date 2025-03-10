import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import frontApi from '@api/frontApi';
import {
    transformTableData,
    formatTimestamp,
    createMessage,
} from '@helper/stringAndDataHelpers';

const orderTitle = {
    email: '郵件信箱',
    name: '姓名',
    tel: '連絡電話',
    address: '地址',
    create_at: '訂單建立時間',
    message: '備註',
};

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        isOrderLoading: false,
        orders: [],
        pagination: {},
        order: {},
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getOrder.fulfilled, (state, action) => {
                state.isOrderLoading = false;
                state.orders = action.payload.orders;
                state.pagination = action.payload.pagination;
            })
            .addCase(getOrderById.fulfilled, (state, action) => {
                state.isOrderLoading = false;
                state.order = action.payload.order;
            })
            .addMatcher(
                isAnyOf(postOrder.fulfilled, postPayById.fulfilled),
                state => {
                    state.isOrderLoading = false;
                }
            )
            .addMatcher(
                isAnyOf(
                    getOrder.pending,
                    getOrderById.pending,
                    postOrder.pending,
                    postPayById.pending
                ),
                state => {
                    state.isOrderLoading = true;
                }
            )
            .addMatcher(
                isAnyOf(
                    getOrder.rejected,
                    getOrderById.rejected,
                    postOrder.rejected,
                    postPayById.rejected
                ),
                state => {
                    state.isOrderLoading = false;
                }
            );
    },
});

export const getOrder = createAsyncThunk('order/getOrder', async (page = 1) => {
    const res = await frontApi.order.getOrder(page);

    return {
        orders: res.data.orders,
        pagination: res.data.pagination,
    };
});

export const getOrderById = createAsyncThunk(
    'order/getOrderById',
    async orderId => {
        const res = await frontApi.order.getOrderById(orderId);
        const transformCartTableData = transformTableData(
            Object.values(res.data.order?.products)
        );

        const orderInf = ['email', 'name', 'tel', 'address'].map(key => ({
            id: key,
            title: orderTitle[key],
            value: res.data?.order?.user[key],
        }));
        orderInf.unshift({
            id: 'create_at',
            title: orderTitle['create_at'],
            value: formatTimestamp(res.data?.order['create_at']),
        });
        orderInf.push({
            id: 'message',
            title: orderTitle['message'],
            value: res.data?.order['message'] ?? '',
        });

        return {
            order: {
                ...res.data.order,
                products: transformCartTableData,
                info: orderInf,
            },
        };
    }
);

export const postOrder = createAsyncThunk(
    'order/postOrder',
    async ({ user, message }, { dispatch }) => {
        const body = { data: { user, message } };
        try {
            const res = await frontApi.order.postOrder(body);
            createMessage(dispatch, res.data.success, res.data.message);

            dispatch(getOrder());

            return {
                orderId: res.data.orderId,
            };
        } catch (error) {
            createMessage(dispatch, false, error?.response?.data?.message);
        }
    }
);

export const postPayById = createAsyncThunk(
    'order/postPayById',
    async (orderId, { dispatch }) => {
        try {
            const res = await frontApi.pay.postPayById(orderId);
            createMessage(dispatch, res.data.success, res.data.message);

            dispatch(getOrder());
        } catch (error) {
            createMessage(dispatch, false, error?.response?.data?.message);
        }
    }
);

export default orderSlice.reducer;
