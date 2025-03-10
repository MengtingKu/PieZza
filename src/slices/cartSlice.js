import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import frontApi from '@api/frontApi';
import {
    transformTableData,
    createMessage,
} from '@helper/stringAndDataHelpers';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        isCartLoading: false,
        carts: { carts: [] },
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getCart.fulfilled, (state, action) => {
                state.isCartLoading = false;
                state.carts = action.payload;
            })
            .addMatcher(
                isAnyOf(
                    getCart.pending,
                    postCart.pending,
                    putCartItem.pending,
                    deleteCartItem.pending,
                    deleteCarts.pending
                ),
                state => {
                    state.isCartLoading = true;
                }
            )
            .addMatcher(
                isAnyOf(
                    postCart.fulfilled,
                    putCartItem.fulfilled,
                    deleteCartItem.fulfilled,
                    deleteCarts.fulfilled
                ),
                state => {
                    state.isCartLoading = false;
                }
            )
            .addMatcher(
                isAnyOf(
                    getCart.rejected,
                    postCart.rejected,
                    putCartItem.rejected,
                    deleteCarts.rejected
                ),
                state => {
                    state.isCartLoading = false;
                }
            );
    },
});

export const getCart = createAsyncThunk('cart/getCart', async () => {
    const res = await frontApi.cart.getCart();
    const transformCartTableData = transformTableData(res.data.data.carts);

    return { ...res.data.data, carts: transformCartTableData };
});

export const postCart = createAsyncThunk(
    'cart/postCart',
    async ({ product_id, qty = 1 }, { dispatch }) => {
        const body = { data: { product_id, qty } };
        try {
            const res = await frontApi.cart.postCart(body);
            createMessage(dispatch, res.data.success, res.data.message);

            dispatch(getCart());
        } catch (error) {
            createMessage(dispatch, false, error?.response?.data?.message);
        }
    }
);

export const putCartItem = createAsyncThunk(
    'cart/putCartItem',
    async ({ id, product_id, qty }, { dispatch }) => {
        const body = { data: { product_id, qty } };
        try {
            const res = await frontApi.cart.putCartById(id, body);
            createMessage(dispatch, res.data.success, res.data.message);

            dispatch(getCart());
        } catch (error) {
            createMessage(dispatch, false, error?.response?.data?.message);
        }
    }
);

export const deleteCartItem = createAsyncThunk(
    'cart/deleteCartItem',
    async (id, { dispatch }) => {
        try {
            const res = await frontApi.cart.deleteCartById(id);
            createMessage(dispatch, res.data.success, res.data.message);

            dispatch(getCart());
        } catch (error) {
            createMessage(dispatch, false, error?.response?.data?.message);
        }
    }
);

export const deleteCarts = createAsyncThunk(
    'cart/deleteCarts',
    async (_, { dispatch }) => {
        try {
            const res = await frontApi.cart.deleteCarts();
            createMessage(dispatch, res.data.success, res.data.message);

            dispatch(getCart());
        } catch (error) {
            createMessage(dispatch, false, error?.response?.data?.message);
        }
    }
);

export default cartSlice.reducer;
