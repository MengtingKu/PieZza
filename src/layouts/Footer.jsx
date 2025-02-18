import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="footer">
            <Link to='/login'>員工頻道</Link>
            <small>©2025 React Demo</small>
        </footer>
    );
};

export default Footer;
