import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProducts } from '@slices/productSlice';
import Icon from '@helper/FontAwesomeIcon';
import ProductCard from '@components/front/ProductCard';
import ButtonLink from '@components/common/ButtonLink';
import Loading from '@components/common/Loading';

const WishList = () => {
	const dispatch = useDispatch();
	const { products, isProductLoading } = useSelector(state => state.product);
	const { wishList } = useSelector(state => state.wishList);
	const [filteredWishList, setFilteredWishList] = useState([]);
	const [currentIcon, setCurrentIcon] = useState('star');
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (products.length === 0) {
			dispatch(getProducts());
		}
	}, [dispatch, products.length]);

	useEffect(() => {
		setIsLoading(true);
		setFilteredWishList(products.filter(product => wishList[product.id]));
		setIsLoading(false);
	}, [dispatch, products, wishList]);

	useEffect(() => {
		setInterval(() => {
			setCurrentIcon('fillStar');
		}, 1000);
	}, []);

	return (
		<div
			className={`container my-4 product_list product_detail wish-list ${
				isProductLoading || isLoading ? 'loading_outerLayer' : ''
			}`}
		>
			{(isProductLoading || isLoading) && <Loading />}
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
			{filteredWishList.length === 0 ? (
				<div className="container text-center p-5">
					<Icon
						icon={currentIcon}
						color={currentIcon === 'star' ? '#2c170b75' : '#ffd700'}
						size="2xl"
					/>
					<h6 className="my-5">
						點擊商品的星星加入收藏，把她保存在畫面上。
					</h6>
					<div className="my-5">
						<ButtonLink
							className="btn btn-link animate_on position-relative wih_btn"
							to="/products"
						>
							查看當前熱銷商品
							<img
								className="btn_bg"
								src="./btn-bg.png"
								alt="btn background"
							/>
						</ButtonLink>
					</div>
				</div>
			) : (
				<div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-5 mt-2 mb-5 product_card">
					{filteredWishList.map(wish => {
						return (
							<div className="col" key={wish.id}>
								<ProductCard product={wish} />
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default WishList;
