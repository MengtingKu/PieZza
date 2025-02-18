import { Outlet } from 'react-router-dom';
import Navbar from '@layouts/Navbar';
import Footer from '@layouts/Footer';
import Sidebar from './layouts/Sidebar';

const AdminApp = () => {
    return (
        <>
            <Navbar />
            <Sidebar />
            <Outlet />
            <Footer />
        </>
    );
};

export default AdminApp;
