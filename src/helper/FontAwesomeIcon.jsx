import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFacebookF,
    faInstagram,
    faThreads,
    faLine,
} from '@fortawesome/free-brands-svg-icons';
import {
    faHome,
    faUser,
    faCog,
    faAngleLeft,
    faPizzaSlice,
    faMoneyBills,
    faNewspaper,
    faPercent,
    faMobileScreenButton,
    faEnvelopeCircleCheck,
    faLocationDot,
    faPowerOff,
    faRightToBracket,
    faArrowRightFromBracket,
    faCartArrowDown,
    faStar,
    faTags,
} from '@fortawesome/free-solid-svg-icons';
import { faUser as faRegularUser } from '@fortawesome/free-regular-svg-icons';

const icons = {
    facebook: faFacebookF,
    ig: faInstagram,
    threads: faThreads,
    line: faLine,
    home: faHome,
    user: faUser,
    settings: faCog,
    angleLeft: faAngleLeft,
    pizzaSlice: faPizzaSlice,
    moneyBills: faMoneyBills,
    newspaper: faNewspaper,
    discount: faPercent,
    phone: faMobileScreenButton,
    email: faEnvelopeCircleCheck,
    login: faRightToBracket,
    logout: faArrowRightFromBracket,
    address: faLocationDot,
    rest: faPowerOff,
    cart: faCartArrowDown,
    star: faStar,
    tag: faTags,
    regularUser: faRegularUser,
};

const Icon = ({ icon, size = 'lg', color = null }) => {
    if (!icons[icon]) {
        console.error(`Font Awesome icon "${icon}" does not exist.`);
        return null;
    }

    return <FontAwesomeIcon icon={icons[icon]} size={size} color={color} />;
};

Icon.propTypes = {
    icon: PropTypes.string.isRequired,
    size: PropTypes.string,
    color: PropTypes.string,
};

export default Icon;
