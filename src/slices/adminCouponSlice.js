import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import adminApi from '@api/adminApi';
import { createMessage } from '@helper/stringAndDataHelpers';

const adminCouponSlice = createSlice({
    name: 'adminCoupon',
    initialState: {
        isCouponLoading: true,
        coupons: [],
        pagination: {},
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getCoupons.fulfilled, (state, action) => {
                state.isCouponLoading = false;
                state.coupons = action.payload.coupons;
                state.pagination = action.payload.pagination;
            })
            .addMatcher(
                isAnyOf(
                    postCoupon.fulfilled,
                    putCouponsById.fulfilled,
                    deleteCouponById.fulfilled
                ),
                state => {
                    state.isCouponLoading = false;
                }
            )
            .addMatcher(
                isAnyOf(
                    postCoupon.pending,
                    putCouponsById.pending,
                    deleteCouponById.pending
                ),
                state => {
                    state.isCouponLoading = true;
                }
            )
            .addMatcher(
                isAnyOf(
                    postCoupon.rejected,
                    putCouponsById.rejected,
                    deleteCouponById.rejected
                ),
                state => {
                    state.isCouponLoading = false;
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
        const body = {
            data: {
                ...params,
                percent: Number(params.percent),
                is_enabled: params.is_enabled ? 1 : 0,
            },
        };
        try {
            const res = await adminApi.coupon.postCoupon(body);
            createMessage(dispatch, res.data.success, res.data.message);

            dispatch(getCoupons());
        } catch (error) {
            createMessage(dispatch, false, error?.response?.data?.message);
        }
    }
);

export const putCouponsById = createAsyncThunk(
    'adminOrder/putCouponsById',
    async ({ id, params }, { dispatch }) => {
        const body = {
            data: {
                ...params,
                person: Number(params.percent),
                is_enabled: params.is_enabled ? 1 : 0,
            },
        };
        try {
            const res = await adminApi.coupon.putCouponsById(id, body);
            createMessage(dispatch, res.data.success, res.data.message);

            dispatch(getCoupons());
        } catch (error) {
            createMessage(dispatch, false, error?.response?.data?.message);
        }
    }
);

export const deleteCouponById = createAsyncThunk(
    'adminOrder/deleteCouponById',
    async (id, { dispatch }) => {
        try {
            const res = await adminApi.coupon.deleteCouponById(id);
            createMessage(dispatch, res.data.success, res.data.message);

            dispatch(getCoupons());
        } catch (error) {
            createMessage(dispatch, false, error?.response?.data?.message);
        }
    }
);

export default adminCouponSlice.reducer;
