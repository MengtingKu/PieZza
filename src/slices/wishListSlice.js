import { createSlice } from '@reduxjs/toolkit';

const wishListSlice = createSlice({
    name: 'wishList',
    initialState: {
        wishList: JSON.parse(localStorage.getItem('wishList')) || {},
    },
    reducers: {
        setWishList: (state, action) => {
            const productId = action.payload;
            state.wishList[productId] = !state.wishList[productId];

            localStorage.setItem('wishList', JSON.stringify(state.wishList));
        },
    },
});

export const { setWishList } = wishListSlice.actions;
export default wishListSlice.reducer;
