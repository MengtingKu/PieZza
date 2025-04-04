import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrder } from '@slices/orderSlice';
import { getProducts } from '@slices/productSlice';
import BannerSection from '@components/front/BannerSection';
import OutstandingSection from '@components/front/OutstandingSection';
import SaleSection from '@components/front/SaleSection';
import BookingOrder from '@components/front/BookingOrder';
import ChefDelicious from '@components/front/ChefDelicious';
import CustomerSection from '@components/front/CustomerSection';
import Loading from '@components/common/Loading';

const HomePage = () => {
	const dispatch = useDispatch();
	const { products, isProductLoading } = useSelector(state => state.product);
	const { isOrderLoading } = useSelector(state => state.order);
	const [specialProducts, setSpecialProducts] = useState([]);

	useEffect(() => {
		dispatch(getOrder());
	}, [dispatch]);

	useEffect(() => {
		if (!products.length) {
			dispatch(getProducts());
		}
		setSpecialProducts(
			products.filter(product => product.origin_price > product.price)
		);
	}, [dispatch, products]);

	const isLoading = useMemo(() => {
		return isProductLoading || isOrderLoading;
	}, [isProductLoading, isOrderLoading]);

	return (
		<div
			className={`container-fluid px-0 page_bg about home_page ${
				isProductLoading ? 'loading_outerLayer' : ''
			}`}
		>
			{isLoading && <Loading />}
			<section className="mb-5 banner_section">
				<BannerSection />
			</section>
			<section className="mb-5 outstanding_section">
				<OutstandingSection />
			</section>
			<section className="mb-5 sale_section">
				<SaleSection specialProducts={specialProducts} />
			</section>
			<section className="mb-5 customer_section">
				<CustomerSection />
			</section>
			<section className="mb-5 overflow-hidden chef_delicious">
				<ChefDelicious />
			</section>
			<section className="mb-5">
				<BookingOrder />
			</section>
		</div>
	);
};

export default HomePage;
