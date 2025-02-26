import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import frontApi from '@api/frontApi';
import { transformTableData } from '@helper/stringAndDataHelpers';

const orderTitle = {
    email: '郵件地址',
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
        message: null,
        success: null,
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
                state.success = action.payload.success;
            })
            .addCase(postOrder.fulfilled, (state, action) => {
                state.isOrderLoading = false;
                state.success = action.payload.success;
                state.message = action.payload.message;
            })
            .addCase(postPayById.fulfilled, (state, action) => {
                state.isOrderLoading = false;
                state.success = action.payload.success;
            })
            .addMatcher(
                isAnyOf(
                    getOrder.pending,
                    getOrderById.pending,
                    postOrder.pending,
                    postPayById.pending
                ),
                state => {
                    state.isOrderLoading = true;
                    state.message = null;
                }
            )
            .addMatcher(
                isAnyOf(
                    getOrder.rejected,
                    getOrderById.rejected,
                    postOrder.rejected,
                    postPayById.rejected
                ),
                (state, action) => {
                    state.isOrderLoading = false;
                    state.message = action.error.message;
                }
            );
    },
});

export const getOrder = createAsyncThunk('order/getOrder', async () => {
    const res = await frontApi.order.getOrder();

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
            value: dayjs
                .unix(res.data?.order['create_at'])
                .format('YYYY-MM-DD HH:mm:ss'),
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
            success: res.data.success,
        };
    }
);

export const postOrder = createAsyncThunk(
    'order/postOrder',
    async ({ user, message }, { dispatch }) => {
        const body = { data: { user, message } };
        const res = await frontApi.order.postOrder(body);
        dispatch(getOrder());

        return {
            orderId: res.data.orderId,
            success: res.data.success,
            message: res.data.message,
        };
    }
);

export const postPayById = createAsyncThunk(
    'order/postPayById',
    async orderId => {
        const res = await frontApi.pay.postPayById(orderId);

        return { success: res.data.success };
    }
);

export default orderSlice.reducer;
