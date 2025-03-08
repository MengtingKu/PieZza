import { configureStore } from '@reduxjs/toolkit';
import productReducer from '@slices/productSlice';
import cartReducer from '@slices/cartSlice';
import wishListReducer from '@slices/wishListSlice';
import orderReducer from '@slices/orderSlice';
import articleReducer from '@slices/articleSlice';
import adminProductReducer from '@slices/adminProductSlice';
import adminOrderReducer from '@slices/adminOrderSlice';
import adminArticleReducer from '@slices/adminArticleSlice';
import adminCouponReducer from '@slices/adminCouponSlice';

export const store = configureStore({
    reducer: {
        product: productReducer,
        cart: cartReducer,
        wishList: wishListReducer,
        order: orderReducer,
        article: articleReducer,
        adminProduct: adminProductReducer,
        adminOrder: adminOrderReducer,
        adminArticle: adminArticleReducer,
        adminCoupon: adminCouponReducer,
    },
});
