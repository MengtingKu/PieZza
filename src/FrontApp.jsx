import { Outlet } from 'react-router-dom';
import Navbar from '@layouts/Navbar';
import Footer from '@layouts/Footer';
import NavbarDropDownMenu from '@layouts/NavbarDropDownMenu';
import AutoScrollToTop from '@components/common/AutoScrollToTop';
import MessageToast from '@components/common/MessageToast';
import ButtonBackToTop from '@components/common/ButtonBackToTop';

const FrontApp = () => {
	return (
		<>
			<Navbar>
				<NavbarDropDownMenu />
			</Navbar>

			<main className="main_height">
				<AutoScrollToTop />
				<MessageToast />
				<Outlet />
			</main>

			<footer className="footer">
				<Footer />
			</footer>
			<ButtonBackToTop />
		</>
	);
};

export default FrontApp;
