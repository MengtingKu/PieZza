import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Icon from '@helper/FontAwesomeIcon';
import { postCart } from '@slices/cartSlice';

const ProductCategoryPage = () => {
    const navigate = useNavigate();
    const { category } = useParams();
    const dispatch = useDispatch();
    const { products } = useSelector(state => state.product);
    const { isCartLoading } = useSelector(state => state.cart);
    const filteredProducts =
        category === undefined || category === 'all'
            ? products
            : products.filter(product => product.category === category);

    return (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-5 product_card my-2">
            {filteredProducts.map(product => (
                <div className="col" key={product.id}>
                    <div className="card h-100 border-0">
                        <img
                            src={product.imageUrl}
                            className="shadow rounded"
                            alt={product.title}
                            onClick={() => navigate(`/product/${product.id}`)}
                        />
                        <div className="card-body d-flex flex-column justify-content-between">
                            <h5
                                className="card-title"
                                onClick={() =>
                                    navigate(`/product/${product.id}`)
                                }
                            >
                                {product.title}
                            </h5>
                            <h6 className="card-subtitle mb-2 text-body-secondary">
                                {product.content}
                            </h6>
                            <button
                                type="button"
                                className="btn w-100 add_toCart"
                                disabled={isCartLoading}
                                onClick={() => {
                                    dispatch(
                                        postCart({ product_id: product.id })
                                    );
                                }}
                            >
                                加入購物車
                                <Icon icon="cart" />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductCategoryPage;
