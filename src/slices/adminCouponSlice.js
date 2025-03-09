import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import adminApi from '@api/adminApi';

const adminCouponSlice = createSlice({
    name: 'adminCoupon',
    initialState: {
        isCouponLoading: false,
        message: null,
        success: null,
        coupons: [],
        pagination: {},
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getCoupons.fulfilled, (state, action) => {
                state.isLoading = false;
                state.coupons = action.payload.coupons;
                state.pagination = action.payload.pagination;
            })
            .addMatcher(
                isAnyOf(
                    postCoupon.fulfilled,
                    putCouponsById.fulfilled,
                    deleteCouponById.fulfilled
                ),
                (state, action) => {
                    state.isLoading = false;
                    state.success = action.payload.success;
                    state.message = action.payload.message;
                }
            )
            .addMatcher(
                isAnyOf(
                    postCoupon.pending,
                    putCouponsById.pending,
                    deleteCouponById.pending
                ),
                state => {
                    state.isLoading = true;
                    state.message = null;
                }
            )
            .addMatcher(
                isAnyOf(
                    postCoupon.rejected,
                    putCouponsById.rejected,
                    deleteCouponById.rejected
                ),
                (state, action) => {
                    state.isLoading = false;
                    state.message = action.error.message;
                }
            );
    },
});

export const getCoupons = createAsyncThunk(
    'adminOrder/getCoupons',
    async (page = 1) => {
        const res = await adminApi.coupon.getCoupons(page);

        return {
            coupons: res.data.coupons,
            pagination: res.data.pagination,
        };
    }
);

export const postCoupon = createAsyncThunk(
    'adminOrder/postCoupon',
    async ({ params }, { dispatch }) => {
        const body = { data: params };
        const res = await adminApi.coupon.postCoupon(body);
        dispatch(getCoupons());

        return {
            success: res.data.success,
            message: res.data.message,
        };
    }
);

export const putCouponsById = createAsyncThunk(
    'adminOrder/putCouponsById',
    async ({ id, params }, { dispatch }) => {
        const body = { data: params };
        const res = await adminApi.coupon.putCouponsById(id, body);
        dispatch(getCoupons());

        return {
            success: res.data.success,
            message: res.data.message,
        };
    }
);

export const deleteCouponById = createAsyncThunk(
    'adminOrder/deleteCouponById',
    async (id, { dispatch }) => {
        const res = await adminApi.coupon.deleteCouponById(id);
        dispatch(getCoupons());

        return {
            success: res.data.success,
            message: res.data.message,
        };
    }
);

export default adminCouponSlice.reducer;
