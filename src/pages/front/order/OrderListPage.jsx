import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrder } from '@slices/orderSlice';
import OrderCollapse from '@components/front/OrderCollapse';
import Pagination from '@components/common/Pagination';
import Loading from '@components/common/Loading';

const OrderListPage = () => {
	const dispatch = useDispatch();
	const { isOrderLoading, orders, pagination } = useSelector(
		state => state.order
	);

	const fetchGetOrder = page => {
		return async dispatch => {
			const response = await dispatch(getOrder(page));

			return response.payload;
		};
	};

	useEffect(() => {
		dispatch(getOrder());
	}, [dispatch]);

	return (
		<div
			className={`container my-5 cart_list ${
				isOrderLoading ? 'loading_outerLayer' : ''
			}`}
		>
			{isOrderLoading && <Loading />}
			<div className="page_title my-4">
				<h3>我的訂單</h3>
				<h6>My orders</h6>
			</div>
			<OrderCollapse orders={orders} />
			<Pagination pagination={pagination} fetchData={fetchGetOrder} />
		</div>
	);
};

export default OrderListPage;
