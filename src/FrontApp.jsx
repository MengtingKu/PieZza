import { Outlet } from 'react-router-dom';
import Navbar from '@layouts/Navbar';
import Footer from '@layouts/Footer';
import NavbarDropDownMenu from '@layouts/NavbarDropDownMenu';
import AutoScrollToTop from '@components/common/AutoScrollToTop';

const FrontApp = () => {
    return (
        <>
            <Navbar>
                <NavbarDropDownMenu />
            </Navbar>
            <main>
                <AutoScrollToTop />
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default FrontApp;
