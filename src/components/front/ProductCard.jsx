import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postCart } from '@slices/cartSlice';
import { splitText } from '@helper/stringAndDataHelpers';
import Icon from '@helper/FontAwesomeIcon';
import WishMark from '@components/front/WishMark';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isCartLoading } = useSelector(state => state.cart);

    return (
        <>
            <div className="card h-100 border-0">
                <div className="position-relative card_img">
                    <img
                        src={product.imageUrl}
                        className="shadow rounded"
                        alt={product.title}
                        onClick={() => navigate(`/product/${product.id}`)}
                    />

                    {product.origin_price > product.price && (
                        <span className="position-absolute special_offer">
                            sale
                        </span>
                    )}
                </div>

                <div className="card-body d-flex flex-column justify-content-between z-1 px-0">
                    <h5 className="position-relative">
                        <div
                            className="card-title"
                            onClick={() => navigate(`/product/${product.id}`)}
                        >
                            <span>{splitText(product?.title).chineseText}</span>
                            <br />
                            <span className="card-subtitle">
                                {splitText(product?.title).engText}
                            </span>
                        </div>

                        <WishMark productId={product?.id} />
                    </h5>
                    <span className="mb-2 text-body-secondary">
                        {product.content}
                    </span>
                    <div className="row justify-content-between align-items-center">
                        <div className="col-md-5">
                            {product.origin_price > product.price && (
                                <span className="d-block unit_price fs-6 text-secondary fw-light text-decoration-line-through">
                                    NT$ {product.origin_price}
                                </span>
                            )}

                            <span
                                className={`unit_price ${
                                    product.origin_price > product.price &&
                                    'text-danger'
                                }`}
                            >
                                NT$ {product.price}
                            </span>
                        </div>
                        <div className="col-md-7 pe-0 position-relative">
                            <button
                                type="button"
                                className="btn w-lg-75 btn-sm float-end add_toCartBtn"
                                disabled={isCartLoading}
                                onClick={() => {
                                    dispatch(
                                        postCart({
                                            product_id: product.id,
                                        })
                                    );
                                }}
                            >
                                加入購物車
                                <Icon icon="cart" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

ProductCard.propTypes = {
    product: PropTypes.shape({
        imageUrl: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        origin_price: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
    }),
};

export default ProductCard;
