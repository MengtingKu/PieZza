import { configureStore } from '@reduxjs/toolkit';
import productReducer from '@slices/productSlice';
import cartReducer from '@slices/cartSlice';
import wishListReducer from '@slices/wishListSlice';
import orderReducer from '@slices/orderSlice';
import articleReducer from '@slices/articleSlice';

export const store = configureStore({
    reducer: {
        product: productReducer,
        cart: cartReducer,
        wishList: wishListReducer,
        order: orderReducer,
        article: articleReducer,
    },
});
