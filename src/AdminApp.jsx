import { Outlet } from 'react-router-dom';
import Navbar from '@layouts/Navbar';
import Footer from '@layouts/Footer';
import Sidebar from './layouts/Sidebar';
import AutoScrollToTop from '@components/common/AutoScrollToTop';

const AdminApp = () => {
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
