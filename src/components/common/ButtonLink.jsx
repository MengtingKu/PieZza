import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ButtonLink = ({
    className,
    children,
    to,
    onClickCustom,
    target = 'self',
}) => {
    const handleClick = () => {
        if (onClickCustom) {
            onClickCustom();
        }
    };

    return (
        <Link
            to={to}
            target={`_${target}`}
            className={`btn multi-line ${className}`}
            onClick={handleClick}
        >
            {children}
            <span /> <span /> <span /> <span />
        </Link>
    );
};

ButtonLink.propTypes = {
    target: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    to: PropTypes.string,
    onClickCustom: PropTypes.func,
};

export default ButtonLink;
