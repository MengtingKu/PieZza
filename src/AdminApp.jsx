/* eslint-disable no-useless-escape */
import axios from 'axios';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { createAsyncMessage } from '@slices/messageSlice';
import { logIn } from '@slices/authSlice';
import Navbar from '@layouts/Navbar';
import Footer from '@layouts/Footer';
import Sidebar from '@layouts/Sidebar';
import MessageToast from '@components/common/MessageToast';
import AutoScrollToTop from '@components/common/AutoScrollToTop';
import ButtonBackToTop from '@components/common/ButtonBackToTop';

const { VITE_BASE_URL: baseURL } = import.meta.env;

const AdminApp = () => {
	const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
	const { pathname } = useLocation();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const checkLogin = useCallback(async () => {
		try {
			await axios.post(`${baseURL}/api/user/check`);
			localStorage.setItem('isLoggedIn', 'true');
			navigate(pathname);
			dispatch(
				createAsyncMessage({
					id: new Date().getTime(),
					type: 'success',
					text: 'hi~歡迎回來',
					icon: 'circleCheck',
				})
			);
		} catch (error) {
			dispatch(
				createAsyncMessage({
					id: new Date().getTime(),
					type: 'danger',
					text: error?.response.data.message,
					icon: 'circleXmark',
				})
			);

			localStorage.removeItem('isLoggedIn');
			navigate('/login');
		}
	}, [navigate, dispatch, pathname]);

	useEffect(() => {
		if (localStorage.getItem('isLoggedIn') === 'true') return;

		const token = document.cookie.replace(
			/(?:(?:^|.*;\s*)reactToken\s*\=\s*([^;]*).*$)|^.*$/,
			'$1'
		);
		axios.defaults.headers.common.Authorization = token;

		checkLogin();
	}, [checkLogin]);

	useEffect(() => {
		if (!isLoggedIn) {
			navigate('/login');
		} else {
			dispatch(logIn());
		}
	}, [isLoggedIn, navigate, dispatch]);

	return (
		<>
			<Navbar />
			<main className="main_height">
				<AutoScrollToTop />
				<MessageToast />
				<Sidebar />
				<Outlet />
			</main>
			<footer className="footer">
				<Footer />
			</footer>
			<ButtonBackToTop />
		</>
	);
};

export default AdminApp;
