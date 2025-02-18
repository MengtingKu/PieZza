import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFacebook,
    faTwitter,
    faGithub,
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
    faArrowRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { faUser as faRegularUser } from '@fortawesome/free-regular-svg-icons'; // 引入 Regular 版本的 fa-user

const icons = {
    facebook: faFacebook,
    twitter: faTwitter,
    github: faGithub,
    home: faHome,
    user: faUser,
    settings: faCog,
    angleLeft: faAngleLeft,
    pizzaSlice: faPizzaSlice,
    moneyBills: faMoneyBills,
    newspaper: faNewspaper,
    discount: faPercent,
    logout: faArrowRightFromBracket,
    regularUser: faRegularUser, // 使用 fa-regular fa-user 並命名為 regularUser
};

const Icon = ({ icon, size = 'lg', color = null }) => {
    if (!icons[icon]) {
        console.error(`Font Awesome icon "${icon}" does not exist.`);
        return null;
    }

    return (
        <FontAwesomeIcon
            icon={icons[icon]}
            size={size}
            color={color}
        ></FontAwesomeIcon>
    );
};

Icon.propTypes = {
    icon: PropTypes.string.isRequired,
    size: PropTypes.string,
    color: PropTypes.string,
};

export default Icon;
