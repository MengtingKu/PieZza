import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isLoggedIn: true,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logOut: state => {
			state.isLoggedIn = false;
		},

		logIn: state => {
			state.isLoggedIn = true;
		},
	},
});

export const { logOut, logIn } = authSlice.actions;
export default authSlice.reducer;
