import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import frontApi from '@api/frontApi';

const productSlice = createSlice({
    name: 'product',
    initialState: {
        isProductLoading: false,
        products: [],
        product: null,
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getProducts.fulfilled, (state, action) => {
                state.isProductLoading = false;
                state.products = action.payload.products;
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.isProductLoading = false;
                state.product = action.payload;
            })
            .addMatcher(
                isAnyOf(getProducts.pending, getProductById.pending),
                state => {
                    state.isProductLoading = true;
                }
            )
            .addMatcher(
                isAnyOf(getProducts.rejected, getProductById.rejected),
                state => {
                    state.isProductLoading = false;
                }
            );
    },
});

export const getProducts = createAsyncThunk('product/getProducts', async () => {
    const res = await frontApi.products.getProductsAll();
    const grouped = Object.groupBy(res.data.products, product =>
        product.origin_price > product.price ? 'sale' : 'normal'
    );
    const { sale, normal } = grouped;

    return {
        products: [...sale, ...normal],
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
