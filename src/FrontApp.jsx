import { Outlet } from 'react-router-dom';
import Navbar from '@layouts/Navbar';
import Footer from '@layouts/Footer';
import NavbarDropDownMenu from '@layouts/NavbarDropDownMenu';
import AutoScrollToTop from '@components/common/AutoScrollToTop';
import MessageToast from '@components/common/MessageToast';

const FrontApp = () => {
    return (
        <>
            <Navbar>
                <NavbarDropDownMenu />
            </Navbar>

            <main
                style={{
                    minHeight: `calc(100vh - 96px)`,
                    marginTop: '69.38px',
                }}
            >
                <AutoScrollToTop />
                <MessageToast />
                <Outlet />
            </main>

            <footer className="footer">
                <Footer />
            </footer>
        </>
    );
};

export default FrontApp;
