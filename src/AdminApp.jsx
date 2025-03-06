/* eslint-disable no-useless-escape */
import axios from 'axios';
import { useEffect, useCallback } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@layouts/Navbar';
import Footer from '@layouts/Footer';
import Sidebar from '@layouts/Sidebar';
import AutoScrollToTop from '@components/common/AutoScrollToTop';

const { VITE_BASE_URL: baseURL } = import.meta.env;

const AdminApp = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const checkLogin = useCallback(async () => {
        try {
            await axios.post(`${baseURL}/api/user/check`);
            localStorage.setItem('isLoggedIn', 'true');
            navigate(pathname);
        } catch (error) {
            // Todo... 吐司訊息串接 api 回傳結果
            console.log('登入驗證錯誤 =>', error, error?.response.data.message);
            localStorage.removeItem('isLoggedIn');
            navigate('/login');
        }
    }, [navigate, pathname]);

    useEffect(() => {
        if (localStorage.getItem('isLoggedIn') === 'true') return;

        const token = document.cookie.replace(
            /(?:(?:^|.*;\s*)reactToken\s*\=\s*([^;]*).*$)|^.*$/,
            '$1'
        );
        axios.defaults.headers.common.Authorization = token;

        checkLogin();
    }, [checkLogin]);

    return (
        <>
            <Navbar />
            <main
                style={{
                    minHeight: `calc(100vh - 96px)`,
                    marginTop: '69.38px',
                }}
            >
                <AutoScrollToTop />
                <Sidebar />
                <Outlet />
            </main>
            <footer className="footer">
                <Footer />
            </footer>
        </>
    );
};

export default AdminApp;
