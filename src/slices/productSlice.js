import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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
            .addCase(getProducts.pending, state => {
                state.isLoading = true;
                state.message = null;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload.products;
                state.message = action.payload.message;
                state.success = action.payload.success;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.message = action.error.message;
            })
            .addCase(getProductById.pending, state => {
                state.isLoading = true;
                state.message = null;
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.product = action.payload;
            })
            .addCase(getProductById.rejected, (state, action) => {
                state.isLoading = false;
                state.message = action.error.message;
            });
    },
});

export const getProducts = createAsyncThunk('product/getProducts', async () => {
    const res = await frontApi.products.getProductsAll();

    return {
        products: res.data.products,
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
