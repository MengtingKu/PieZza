import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import adminApi from '@api/adminApi';
import { createMessage } from '@helper/stringAndDataHelpers';

const adminProductSlice = createSlice({
    name: 'adminProduct',
    initialState: {
        isProductLoading: false,
        products: [],
        pagination: {},
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getProductsAll.fulfilled, (state, action) => {
                state.isProductLoading = false;
                state.products = action.payload.products;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.isProductLoading = false;
                state.products = action.payload.products;
                state.pagination = action.payload.pagination;
            })
            .addMatcher(
                isAnyOf(
                    postProduct.fulfilled,
                    putProductById.fulfilled,
                    deleteProduct.fulfilled
                ),
                state => {
                    state.isProductLoading = false;
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
                    state.isProductLoading = true;
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
                state => {
                    state.isProductLoading = false;
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
        try {
            const res = await adminApi.products.postProduct(body);
            createMessage(dispatch, res.data.success, res.data.message);

            dispatch(getProducts());
        } catch (error) {
            createMessage(dispatch, false, error?.response?.data?.message);
        }
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
        try {
            const res = await adminApi.products.putProductById(id, body);
            createMessage(dispatch, res.data.success, res.data.message);

            dispatch(getProducts());
        } catch (error) {
            createMessage(dispatch, false, error?.response?.data?.message);
        }
    }
);

export const deleteProduct = createAsyncThunk(
    'adminProduct/deleteProduct',
    async ({ id }, { dispatch }) => {
        try {
            const res = await adminApi.products.deleteProduct(id);
            createMessage(dispatch, res.data.success, res.data.message);

            dispatch(getProducts());
        } catch (error) {
            createMessage(dispatch, false, error?.response?.data?.message);
        }
    }
);

export default adminProductSlice.reducer;
