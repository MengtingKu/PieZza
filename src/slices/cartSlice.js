import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import frontApi from '@api/frontApi';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        isCartLoading: false,
        message: null,
        success: null,
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
                    state.message = null;
                }
            )
            .addMatcher(
                isAnyOf(
                    postCart.fulfilled,
                    putCartItem.fulfilled,
                    deleteCartItem.fulfilled,
                    deleteCarts.pending
                ),
                (state, action) => {
                    state.isCartLoading = false;
                    state.success = action.payload.success;
                    state.message = action.payload.message;
                }
            )
            .addMatcher(
                isAnyOf(
                    getCart.rejected,
                    postCart.rejected,
                    putCartItem.rejected,
                    deleteCarts.rejected
                ),
                (state, action) => {
                    state.isCartLoading = false;
                    state.message = action.error.message;
                }
            );
    },
});

export const getCart = createAsyncThunk('cart/getCart', async () => {
    const res = await frontApi.cart.getCart();
    const CartTableData = res.data.data.carts?.map(item => {
        const flatItem = { ...item };
        for (const [key, value] of Object.entries(item.product)) {
            flatItem[`product_${key}`] = value;
        }
        return flatItem;
    });

    return { ...res.data.data, carts: CartTableData };
});

export const postCart = createAsyncThunk(
    'cart/postCart',
    async ({ product_id, qty = 1 }, { dispatch }) => {
        const body = { data: { product_id, qty } };
        const res = await frontApi.cart.postCart(body);
        dispatch(getCart());

        return {
            success: res.data.success,
            message: res.data.message,
        };
    }
);

export const putCartItem = createAsyncThunk(
    'cart/putCartItem',
    async ({ id, product_id, qty }, { dispatch }) => {
        const body = { data: { product_id, qty } };
        const res = await frontApi.cart.putCartById(id, body);
        dispatch(getCart());

        return {
            success: res.data.success,
            message: res.data.message,
        };
    }
);

export const deleteCartItem = createAsyncThunk(
    'cart/deleteCartItem',
    async ({ id }, { dispatch }) => {
        const res = await frontApi.cart.deleteCartById(id);
        dispatch(getCart());

        return {
            success: res.data.success,
            message: res.data.message,
        };
    }
);

export const deleteCarts = createAsyncThunk(
    'cart/deleteCarts',
    async (_, { dispatch }) => {
        const res = await frontApi.cart.deleteCarts();
        dispatch(getCart());

        return {
            success: res.data.success,
            message: res.data.message,
        };
    }
);

export default cartSlice.reducer;
