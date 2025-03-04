import ModalImage from 'react-modal-image';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWindowSize } from 'react-use';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '@slices/productSlice';
import Icon from '@helper/FontAwesomeIcon';
import LinkButton from '@components/common/LinkButton';

const SaleSection = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { products } = useSelector(state => state.product);
    const { width } = useWindowSize();
    const [specialProducts, setSpecialProducts] = useState([]);

    useEffect(() => {
        if (!products.length) {
            dispatch(getProducts());
        }
        setSpecialProducts(
            products.filter(product => product.origin_price > product.price)
        );
    }, [dispatch, products]);

    return (
        <div className="container px-5">
            <div className="title_group" style={{ color: '#ffc107' }}>
                <h3 className="title text-center">好康的在這裡！！！</h3>
                <h6 className="subtitle text-center">see today best deal!!!</h6>
            </div>
            <div className="row">
                {specialProducts.map(pro => {
                    return (
                        <div className="col-3 lightbox_group" key={pro.id}>
                            <ModalImage
                                small={pro.imageUrl}
                                medium={pro.imageUrl}
                                alt={pro.title}
                                className="swiper_image my-3"
                            />
                            <div className="text-center">
                                <button
                                    type="button"
                                    className="btn btn-link text-warning opacity-50 px-3 go_shoppingBtn"
                                    onClick={() => {
                                        navigate(`/product/${pro.id}`);
                                    }}
                                >
                                    {' '}
                                    {width > 787 ? (
                                        <span>
                                            點我看降價 <Icon icon="down" />{' '}
                                            {`${pro.origin_price - pro.price}`}
                                        </span>
                                    ) : (
                                        '點我'
                                    )}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="text-center mt-3" style={{ marginBottom: '5rem' }}>
                <LinkButton
                    className="btn-sm btn-warning opacity-75 border-0 rounded-0"
                    to="/products"
                >
                    更多美食
                </LinkButton>
            </div>
        </div>
    );
};

export default SaleSection;
