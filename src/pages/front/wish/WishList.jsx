import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProducts } from '@slices/productSlice';
import ProductCard from '@components/front/ProductCard';

const WishList = () => {
    const dispatch = useDispatch();
    const { products } = useSelector(state => state.product);
    const { wishList } = useSelector(state => state.wishList);
    const [filteredWishList, setFilteredWishList] = useState([]);

    useEffect(() => {
        if (products.length === 0) {
            dispatch(getProducts());
        }
    }, [dispatch, products.length]);

    useEffect(() => {
        setFilteredWishList(products.filter(product => wishList[product.id]));
    }, [dispatch, products, wishList]);

    return (
        <div className="container my-4 product_list product_detail">
            <div className="page_title">
                <h3>私藏美味</h3>
                <h6>A Taste That Belongs to Me</h6>
            </div>
            <nav className="my-3" aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to="/products">Menu</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        私藏美味
                    </li>
                </ol>
            </nav>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-5 mt-2 mb-5 product_card">
                {filteredWishList.map(wish => {
                    return (
                        <div className="col" key={wish.id}>
                            <ProductCard product={wish} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default WishList;
