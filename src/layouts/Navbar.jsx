import '@assets/common/logo.scss';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
    const routes = [
        { path: '/', name: 'Home' },
        { path: '/products', name: 'Menu' },
        { path: '/articles', name: 'Blog' },
        { path: '/about', name: 'About Us' },
    ];

    return (
        <header className="header">
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <img
                            src="/pie_zza.webp"
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
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarNavDropdown"
                    >
                        <ul className="navbar-nav">
                            {routes.map(route => {
                                return (
                                    <li className="nav-item" key={route.name}>
                                        <NavLink
                                            className="nav-link"
                                            aria-current="page"
                                            to={route.path}
                                        >
                                            {route.name}
                                        </NavLink>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
