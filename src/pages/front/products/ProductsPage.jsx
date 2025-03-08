import { useEffect } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '@slices/productSlice';

const ProductsPage = () => {
    const dispatch = useDispatch();
    const { products, isLoading } = useSelector(state => state.product);
    const { category } = useParams();

    const categories = [
        'all',
        ...new Set(products.map(product => product.category)),
    ];

    const getActiveClass = cat => {
        if (category === undefined && cat === 'all') {
            return 'active';
        }

        return category === cat ? 'active' : '';
    };

    useEffect(() => {
        if (products.length === 0) {
            dispatch(getProducts());
        }
    }, [dispatch, products.length]);

    return (
        <div className="product_list">
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <div className="page_banner">
                        <div className="layer">
                            <p className="page_banner">Hello Welcome</p>
                        </div>
                    </div>
                    <div className="container overflow-hidden">
                        <div className="menu_filter my-4">
                            <ul className="nav justify-content-center">
                                {categories.map(cat => {
                                    return (
                                        <li
                                            className="nav-item filter_item"
                                            key={cat}
                                        >
                                            <Link
                                                className={`nav-link ${getActiveClass(
                                                    cat
                                                )}`}
                                                aria-current="page"
                                                to={
                                                    cat === 'all'
                                                        ? '/products'
                                                        : `/products/${cat}`
                                                }
                                            >
                                                {cat}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                        <Outlet />
                    </div>
                </>
            )}
        </div>
    );
};

export default ProductsPage;
