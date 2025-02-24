import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setWishList } from '@slices/wishListSlice';
import Icon from '@helper/FontAwesomeIcon';

const WishMark = ({ productId }) => {
    const dispatch = useDispatch();
    const { wishList } = useSelector(state => state.wishList);
    const [animate, setAnimate] = useState('');

    const toggleWishList = () => {
        if (!wishList[productId]) {
            setAnimate('fa-shake shake_animate');
        }
        dispatch(setWishList(productId));
        setTimeout(() => {
            setAnimate('');
        }, 2000);
    };

    return (
        <span
            className={`position-absolute top-0 end-0 wish_mark ${animate}`}
            onClick={() => toggleWishList()}
        >
            <Icon
                icon={wishList[productId] ? 'fillStar' : 'star'}
                color={wishList[productId] ? '#ffd700' : '#2c170b75'}
            />
        </span>
    );
};

WishMark.propTypes = {
    productId: PropTypes.string.isRequired,
};

export default WishMark;
