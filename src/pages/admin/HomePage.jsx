import { useCallback, useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsAll } from '@slices/adminProductSlice';
import { getOrders } from '@slices/adminOrderSlice';
import { getArticles } from '@slices/adminArticleSlice';
import { formatTimestamp } from '@helper/stringAndDataHelpers';
import OperationSummary from '@components/admin/OperationSummary';
import PerformanceChart from '@components/admin/PerformanceChart';
import LatestOrder from '@components/admin/LatestOrder';
import RecentActivities from '@components/admin/RecentActivities';
import Loading from '@components/common/Loading';

const HomePage = () => {
	const dispatch = useDispatch();
	const { isProductLoading, products } = useSelector(
		state => state.adminProduct
	);
	const [isLoading, setIsLoading] = useState(false);
	const [pieData, setPieData] = useState([]);
	const [allOrdersData, setAllOrdersData] = useState([]);
	const [allOrders, setAllOrders] = useState({});
	const [incomeData, setIncomeData] = useState([]);
	const isFetching = useRef(false);

	const calcProductCategory = products => {
		const grouped = Object.groupBy(products, pro => pro.category);

		return Object.entries(grouped).map(([key, value]) => {
			return { value: value.length, name: key };
		});
	};

	const calcDailyIncome = allOrders => {
		const incomeByDate = allOrders?.payment.reduce((acc, order) => {
			const date = formatTimestamp(order.paid_date, 'YYYY-MM-DD');

			if (!acc[date]) {
				acc[date] = { income: 0, paymentNo: 0 };
			}

			acc[date]['income'] += order.total;
			acc[date]['paymentNo'] += 1;

			return acc;
		}, {});

		setIsLoading(false);

		return Object.entries(incomeByDate).map(([date, income]) => ({
			date,
			income: income.income,
			paymentNo: income.paymentNo,
		}));
	};

	const fetchOrders = useCallback(async () => {
		if (isFetching.current) return;

		isFetching.current = true;

		let page = 1;
		let allOrdersData = [];
		let totalPages = 1;

		while (page <= totalPages) {
			const result = await dispatch(getOrders(page));
			const { orders: pageOrders, pagination } = result.payload;

			allOrdersData = [...allOrdersData, ...pageOrders];
			totalPages = pagination.total_pages;

			page++;
		}

		const grouped = Object.groupBy(allOrdersData, order =>
			order.is_paid ? 'payment' : 'noPayment'
		);

		setAllOrdersData(allOrdersData);
		setAllOrders(grouped);
		isFetching.current = false;
	}, [dispatch]);

	useEffect(() => {
		setIsLoading(true);
		Promise.all([dispatch(getProductsAll()), dispatch(getArticles())]);
	}, [dispatch]);

	useEffect(() => {
		if (!isProductLoading) {
			setPieData(calcProductCategory(products));
		}
	}, [products, isProductLoading]);

	useEffect(() => {
		fetchOrders();
	}, [fetchOrders]);

	useEffect(() => {
		if (Object.keys(allOrders).length > 0) {
			const dailyIncome = calcDailyIncome(allOrders);
			setIncomeData(dailyIncome);
		}
	}, [allOrders]);

	return (
		<div
			className={`container px-5 pb-5 admin_home ${
				isLoading ? 'loading_outerLayer' : ''
			}`}
		>
			{isLoading && <Loading />}
			<div className="header_group mb-3 d-flex justify-content-between align-items-end cart_list">
				<div className="page_title">
					<h3>經營總覽</h3>
					<h6>Operation Overview</h6>
				</div>
			</div>
			<section className="operations_summary mb-3">
				<OperationSummary
					incomeData={incomeData}
					allOrders={allOrders}
				/>
			</section>
			<section className="performance_chart mb-3">
				<PerformanceChart incomeData={incomeData} pieData={pieData} />
			</section>
			<section className="latest_order mb-3">
				<LatestOrder
					incomeData={incomeData}
					allOrdersData={allOrdersData}
				/>
			</section>
			<section className="recent_activities">
				<RecentActivities />
			</section>
		</div>
	);
};

export default HomePage;
