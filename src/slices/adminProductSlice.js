import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import adminApi from '@api/adminApi';

const adminProductSlice = createSlice({
    name: 'adminProduct',
    initialState: {
        products: [],
        isLoading: false,
        message: null,
        success: null,
        pagination: {},
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getProductsAll.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload.products;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload.products;
                state.pagination = action.payload.pagination;
            })
            .addMatcher(
                isAnyOf(
                    postProduct.fulfilled,
                    putProductById.fulfilled,
                    deleteProduct.fulfilled
                ),
                (state, action) => {
                    state.isLoading = false;
                    state.success = action.payload.success;
                    state.message = action.payload.message;
                }
            )
            .addMatcher(
                isAnyOf(
                    getProductsAll.pending,
                    getProducts.pending,
                    postProduct.pending,
                    putProductById.pending,
                    deleteProduct.pending
                ),
                state => {
                    state.isLoading = true;
                    state.message = null;
                }
            )
            .addMatcher(
                isAnyOf(
                    getProductsAll.rejected,
                    getProducts.rejected,
                    postProduct.rejected,
                    putProductById.rejected,
                    deleteProduct.rejected
                ),
                (state, action) => {
                    state.isLoading = false;
                    state.message = action.error.message;
                }
            );
    },
});

export const getProductsAll = createAsyncThunk(
    'adminProduct/getProductsAll',
    async () => {
        const res = await adminApi.products.getProductsAll();

        return {
            products: Object.values(res.data.products),
        };
    }
);

export const getProducts = createAsyncThunk(
    'adminProduct/getProducts',
    async (page = 1) => {
        const res = await adminApi.products.getProducts(page);

        return {
            products: res.data.products,
            pagination: res.data.pagination,
        };
    }
);

export const postProduct = createAsyncThunk(
    'adminProduct/postProduct',
    async ({ params }, { dispatch }) => {
        const body = {
            data: {
                ...params,
                origin_price: Number(params.origin_price),
                price: Number(params.price),
                is_enabled: params.is_enabled ? 1 : 0,
            },
        };
        const res = await adminApi.products.postProduct(body);
        dispatch(getProducts());

        return {
            success: res.data.success,
            message: res.data.message,
        };
    }
);

export const putProductById = createAsyncThunk(
    'adminProduct/postProduct',
    async ({ id, params }, { dispatch }) => {
        const body = {
            data: {
                ...params,
                origin_price: Number(params.origin_price),
                price: Number(params.price),
                is_enabled: params.is_enabled ? 1 : 0,
            },
        };
        const res = await adminApi.products.putProductById(id, body);
        dispatch(getProducts());

        return {
            success: res.data.success,
            message: res.data.message,
        };
    }
);

export const deleteProduct = createAsyncThunk(
    'adminProduct/deleteProduct',
    async ({ id }, { dispatch }) => {
        const res = await adminApi.products.deleteProduct(id);
        dispatch(getProducts());

        return {
            success: res.data.success,
            message: res.data.message,
        };
    }
);

export default adminProductSlice.reducer;
