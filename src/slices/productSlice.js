import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import frontApi from '@api/frontApi';

const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        product: null,
        isLoading: false,
        message: null,
        success: null,
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload.products;
                state.message = action.payload.message;
                state.success = action.payload.success;
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.product = action.payload;
            })
            .addMatcher(
                isAnyOf(getProducts.pending, getProductById.pending),
                state => {
                    state.isLoading = true;
                    state.message = null;
                }
            )
            .addMatcher(
                isAnyOf(getProducts.rejected, getProductById.rejected),
                (state, action) => {
                    state.isLoading = false;
                    state.message = action.error.message;
                }
            );
    },
});

export const getProducts = createAsyncThunk('product/getProducts', async () => {
    const res = await frontApi.products.getProductsAll();
    const grouped = Map.groupBy(res.data.products, product =>
        product.origin_price > product.price ? 'sale' : 'normal'
    );
    const [[, sale], [, normal]] = grouped;

    return {
        products: [...normal, ...sale],
        message: res.data.message,
        success: res.data.success,
    };
});

export const getProductById = createAsyncThunk(
    'product/getProductById',
    async id => {
        const res = await frontApi.products.getProductById(id);

        return res.data.product;
    }
);

export default productSlice.reducer;
