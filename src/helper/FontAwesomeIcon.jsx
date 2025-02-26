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
    faAngleRight,
    faPizzaSlice,
    faMoneyBills,
    faNewspaper,
    faPercent,
    faMobileScreenButton,
    faCommentDots,
    faEnvelopeCircleCheck,
    faLocationDot,
    faPowerOff,
    faRightToBracket,
    faArrowRightFromBracket,
    faCartArrowDown,
    faStar,
    faStarHalf,
    faStarOfLife,
    faTags,
    faPlus,
    faMinus,
    faTrashCan,
    faXmark,
    faCheck,
    faFireFlameCurved,
    faBasketShopping,
    faCircleInfo,
} from '@fortawesome/free-solid-svg-icons';
import {
    faUser as faRegularUser,
    faStar as faRegularStar,
} from '@fortawesome/free-regular-svg-icons';

const icons = {
    facebook: faFacebookF,
    ig: faInstagram,
    threads: faThreads,
    line: faLine,
    home: faHome,
    user: faUser,
    settings: faCog,
    angleLeft: faAngleLeft,
    angleRight: faAngleRight,
    pizzaSlice: faPizzaSlice,
    moneyBills: faMoneyBills,
    newspaper: faNewspaper,
    discount: faPercent,
    phone: faMobileScreenButton,
    email: faEnvelopeCircleCheck,
    login: faRightToBracket,
    message: faCommentDots,
    logout: faArrowRightFromBracket,
    address: faLocationDot,
    rest: faPowerOff,
    cart: faCartArrowDown,
    basket: faBasketShopping,
    fillStar: faStar,
    star: faRegularStar,
    halfStar: faStarHalf,
    required: faStarOfLife,
    tag: faTags,
    plus: faPlus,
    minus: faMinus,
    remove: faTrashCan,
    xmark: faXmark,
    check: faCheck,
    fire: faFireFlameCurved,
    info: faCircleInfo,
    regularUser: faRegularUser,
};

const Icon = ({ icon, size = 'lg', color = null, className = '' }) => {
    if (!icons[icon]) {
        console.error(`Font Awesome icon "${icon}" does not exist.`);
        return null;
    }

    return (
        <FontAwesomeIcon
            icon={icons[icon]}
            size={size}
            color={color}
            className={className}
        />
    );
};

Icon.propTypes = {
    icon: PropTypes.string.isRequired,
    size: PropTypes.string,
    color: PropTypes.string,
    className: PropTypes.string,
};

export default Icon;
