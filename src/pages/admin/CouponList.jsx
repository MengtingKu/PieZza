import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getCoupons,
	postCoupon,
	putCouponsById,
	deleteCouponById,
} from '@slices/adminCouponSlice';
import DynamicTable from '@components/common/DynamicTable';
import Pagination from '@components/common/Pagination';
import DialogBasic from '@components/common/DialogBasic';
import DialogCouponContent from '@components/admin/DialogCouponContent';
import Loading from '@components/common/Loading';

const defaultTemplateData = {
	title: '',
	is_enabled: 1,
	percent: 80,
	due_date: new Date().getTime(),
	code: '',
};

const CouponList = () => {
	const dispatch = useDispatch();
	const { coupons, pagination, isCouponLoading } = useSelector(
		state => state.adminCoupon
	);
	const [currentPage, setCurrentPage] = useState(0);
	const [modalType, setModalType] = useState('');
	const [templateData, setTemplateData] = useState(defaultTemplateData);
	const [showModal, setShowModal] = useState(false);

	const couponsFields = [
		{
			key: 'no',
			name: '#',
			class: 'text-center align-middle',
			type: 'dataNo',
			width: '5%',
			render: index => {
				const perPage = 10;
				const pageOffset =
					currentPage > 0 ? (currentPage - 1) * perPage : currentPage;
				const displayNo = pageOffset + index + 1;

				return <span>{displayNo}</span>;
			},
		},
		{
			key: 'title',
			name: '活動名稱',
			class: 'text-start align-middle',
			type: 'custom',
			render: coupon => {
				return (
					<>
						<span className="ps-2">
							{coupon.title} -{' '}
							<span className="fw-bold text-success">
								{coupon.percent}
								<small className="ms-1">%</small>
							</span>
						</span>
					</>
				);
			},
		},
		{
			key: 'due_date',
			name: '到期日期',
			class: 'text-center align-middle',
			type: 'custom',
			render: coupon => {
				return (
					<span>{dayjs(coupon.due_date).format('YYYY-MM-DD')}</span>
				);
			},
		},
		{
			key: 'is_enabled',
			name: '停啟用',
			class: 'text-center align-middle',
			type: 'custom',
			render: coupon => {
				return (
					<>
						{coupon.is_enabled ? (
							<small className="text-success">啟用</small>
						) : (
							<small className="text-danger">停用</small>
						)}
					</>
				);
			},
		},
	];
	const couponActions = [
		{
			label: '編輯',
			class: 'btn btn-outline-primary',
			handler: coupon => {
				setTemplateData({ ...defaultTemplateData, ...coupon });
				setModalType('edit');
				setShowModal(true);
			},
			render: () => {
				return <span>編輯</span>;
			},
		},
		{
			label: '查看',
			class: 'btn btn-outline-secondary',
			handler: coupon => {
				setTemplateData({ ...defaultTemplateData, ...coupon });
				setModalType('read');
				setShowModal(true);
			},
			render: () => {
				return <span>查看</span>;
			},
		},
		{
			label: '刪除',
			class: 'btn btn-outline-danger',
			handler: coupon => {
				setTemplateData({ ...defaultTemplateData, ...coupon });
				setModalType('delete');
				setShowModal(true);
			},
			render: () => {
				return <span>刪除</span>;
			},
		},
	];

	const fetchGetCoupons = page => {
		setCurrentPage(page);

		return async dispatch => {
			const response = await dispatch(getCoupons(page));

			return response.payload;
		};
	};

	const closeModal = () => {
		setShowModal(false);
		setTemplateData(defaultTemplateData);
	};

	const handleTarget = () => {
		switch (modalType) {
			case 'create':
				dispatch(postCoupon({ params: templateData }));
				break;
			case 'edit':
				dispatch(
					putCouponsById({
						id: templateData.id,
						params: templateData,
						currentPage,
					})
				);
				break;
			case 'delete':
				dispatch(deleteCouponById(templateData.id));
				break;
			case 'read':
				break;
			default:
				alert('操作失敗');
		}
		setModalType('');
		closeModal();
	};

	const handleModalInputChange = e => {
		const { id, value, type, checked } = e.target;
		setTemplateData(prevData => ({
			...prevData,
			[id]: type === 'checkbox' ? checked : value,
		}));
	};

	const handleDatePickerChange = date => {
		setTemplateData(prevData => ({
			...prevData,
			due_date: new Date(date).getTime(),
		}));
	};

	const renderContent = () => {
		return (
			<DialogCouponContent
				modalType={modalType}
				templateData={templateData}
				handleModalInputChange={handleModalInputChange}
				handleDatePickerChange={handleDatePickerChange}
			/>
		);
	};

	useEffect(() => {
		dispatch(getCoupons());
	}, [dispatch]);

	return (
		<>
			<div
				className={`container cart_list ${
					isCouponLoading ? 'loading_outerLayer' : ''
				}`}
			>
				{isCouponLoading && <Loading />}
				<div className="header_group d-flex justify-content-between align-items-end">
					<div className="page_title">
						<h3>優惠券管理列表</h3>
						<h6>Order Management List</h6>
					</div>
					<div>
						<button
							type="button"
							className="btn btn-primary rounded-0"
							onClick={() => {
								setModalType('create');
								setShowModal(true);
							}}
						>
							新增優惠券
						</button>
					</div>
				</div>
				<div className="my-5">
					<DynamicTable
						data={coupons || []}
						fields={couponsFields}
						endActions={couponActions}
					/>
					<Pagination
						pagination={pagination}
						fetchData={fetchGetCoupons}
					/>
				</div>
			</div>

			{showModal && (
				<DialogBasic
					modalType={modalType}
					closeModal={closeModal}
					topic="優惠券"
					handleTarget={handleTarget}
					setTemplateData={setTemplateData}
					showModal={showModal}
				>
					{renderContent()}
				</DialogBasic>
			)}
		</>
	);
};

export default CouponList;
