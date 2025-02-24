import { Outlet } from 'react-router-dom';
import Navbar from '@layouts/Navbar';
import Footer from '@layouts/Footer';
import NavbarDropDownMenu from '@layouts/NavbarDropDownMenu';

const FrontApp = () => {
    return (
        <>
            <Navbar>
                <NavbarDropDownMenu />
            </Navbar>
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default FrontApp;
