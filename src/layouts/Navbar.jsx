import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useClickAway } from 'react-use';
import { useSelector } from 'react-redux';
import Icon from '@helper/FontAwesomeIcon';
import useScroll from '@hook/useScroll';

const routes = [
    { path: '/', name: 'Home' },
    { path: '/products', name: 'Menu' },
    { path: '/blog', name: 'Blog' },
    { path: '/about', name: 'About' },
    { path: '/wish', name: 'Wish' },
];

const Navbar = ({ children }) => {
    const { orders } = useSelector(state => state.order);
    const [isOpen, setIsOpen] = useState(false);
    const navbarCollapse = useRef(null);
    const navbarRef = useRef(null);
    const scrollY = useScroll();

    useClickAway(navbarRef, () => setIsOpen(false));

    const navbarBackground = scrollY > 70 ? 'rgba(26, 11, 3, 0.8)' : '#1a0b03';

    useEffect(() => {
        if (isOpen) {
            navbarCollapse.current.classList.remove('d-none');
        } else {
            navbarCollapse.current.classList.add('d-none');
        }
    }, [isOpen]);

    return (
        <header
            className="header"
            style={{ backgroundColor: navbarBackground }}
        >
            <nav ref={navbarRef} className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <img
                            src="./pie-zza.webp"
                            alt="logo"
                            className="img-fluid logo"
                        />
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNavDropdown"
                        aria-controls="navbarNavDropdown"
                        aria-expanded={isOpen ? 'true' : 'false'}
                        aria-label="Toggle navigation"
                        onClick={() => setIsOpen(prev => !prev)}
                    >
                        <Icon icon={isOpen ? 'minus' : 'plus'} />
                    </button>
                    <div
                        ref={navbarCollapse}
                        className={`collapse navbar-collapse justify-content-end ${
                            isOpen ? 'd-block' : 'd-none'
                        }`}
                        id="navbarNavDropdown"
                    >
                        <ul className="navbar-nav align-items-md-center">
                            {routes.map(route => {
                                return (
                                    <li
                                        className="nav-item me-1"
                                        key={route.name}
                                    >
                                        <NavLink
                                            className="nav-link"
                                            aria-current="page"
                                            to={route.path}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {route.name}
                                        </NavLink>
                                    </li>
                                );
                            })}
                            {orders.length && (
                                <li className="nav-item me-1">
                                    <NavLink
                                        className="nav-link"
                                        aria-current="page"
                                        to="/orders"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Orders
                                    </NavLink>
                                </li>
                            )}
                            <li className="nav-item">{children}</li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

Navbar.propTypes = {
    children: PropTypes.node,
};

export default Navbar;
