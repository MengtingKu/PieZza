import Swal from 'sweetalert2';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCart } from '@slices/cartSlice';
import { createMessage, getRandomItems } from '@helper/stringAndDataHelpers';
import DialogBasic from '@components/common/DialogBasic';
import frontApi from '@api/frontApi';
import Icon from '@helper/FontAwesomeIcon';

const DialogCouponContent = ({ setTotalCost }) => {
	const coupons = getRandomItems(
		['wewin60', 'justyou10', 'lucky80', 'lucky80', 'always90', 'coupon50'],
		3
	);
	const dispatch = useDispatch();
	const [showModal, setShowModal] = useState(false);
	const [code, setCode] = useState('');
	const [selectedCouponIndex, setSelectedCouponIndex] = useState(null);
	const [disabled, setDisabled] = useState(false);
	const [message, setMessage] = useState({});
	const [canDraw, setCanDraw] = useState(true);

	const openModal = () => {
		setMessage({});
		setShowModal(true);
		setDisabled(false);
	};

	const handleInputChange = e => {
		setCode(e.target.value);
	};

	const selectCoupon = async index => {
		if (!disabled) {
			setDisabled(true);
			setSelectedCouponIndex(index);
			setCode(coupons[index]);

			await handlePostCoupon(coupons[index]);
		}
	};

	const handlePostCoupon = async code => {
		try {
			const res = await frontApi.coupon.postCoupon({
				data: { code },
			});

			dispatch(getCart());
			setTotalCost(res.data.data.final_total);
			setMessage(res.data);

			localStorage.setItem('couponCode', code);
			const endOfDay = dayjs().endOf('day');
			localStorage.setItem('resetTime', endOfDay.toISOString());

			setTimeout(() => {
				Swal.fire({
					title: `中獎啦！
                    恭喜獲得 ${code} 優惠券`,
					width: 600,
					padding: '3em',
					timer: 3000,
					showConfirmButton: false,
					showClass: {
						popup: `
                          animate__animated
                          animate__fadeInUp
                          animate__faster
                        `,
					},
					hideClass: {
						popup: `
                          animate__animated
                          animate__fadeOutDown
                          animate__faster
                        `,
					},
					color: '#716add',
					background: '#fff',
					backdrop: `
                    rgba(0,0,123,0.4) url("/congratulation-bg.png")
                    left top
                    no-repeat
                  `,
				});
			}, 500);
		} catch (error) {
			setMessage(error?.response?.data);
			createMessage(dispatch, false, error?.response?.data?.message);
		}
	};

	const closeModal = () => {
		setShowModal(false);
		setSelectedCouponIndex(null);
	};

	useEffect(() => {
		const storedCouponCode = localStorage.getItem('couponCode');
		const resetTime = localStorage.getItem('resetTime');

		if (storedCouponCode) {
			setCanDraw(false);
			setCode(storedCouponCode);
		}

		if (resetTime) {
			setCanDraw(false);
			if (dayjs().isAfter(dayjs(resetTime))) {
				localStorage.removeItem('couponCode');
				localStorage.removeItem('resetTime');
				setCanDraw(true);
			}
		}
	}, []);

	return (
		<>
			<div className="input-group input-group-sm my-1 coupon_code">
				<input
					type="text"
					className="form-control rounded-0 py-2"
					aria-label="Sizing example input"
					aria-describedby="inputGroup-sizing-sm"
					value={code}
					onChange={handleInputChange}
					readOnly
				/>
			</div>
			{Object.keys(message).length ? (
				<small className="text-warning">
					{message.message}{' '}
					<Icon icon="cheers" className="fa-shake ms-1" />
				</small>
			) : canDraw ? (
				<button
					type="button"
					className="btn btn-link btn-sm text-success text-decoration-none"
					onClick={() => openModal()}
				>
					<Icon icon="handRight" className="fa-bounce me-1" />
					點我抽優惠券
				</button>
			) : (
				<small className="text-danger">今天參加過抽獎</small>
			)}

			{showModal && (
				<DialogBasic
					modalTitle="抽獎就在這一刻"
					closeModal={closeModal}
					handleTarget={handlePostCoupon}
					showModal={showModal}
				>
					<div className="container pb-5">
						<div className="row">
							<span className="d-block text-center mb-5 text-light">
								每天有一次抽獎機會！ ๑• . •๑
							</span>
							{coupons.map((coupon, index) => (
								<div
									className="col-md-4"
									key={index}
									onClick={() => {
										selectCoupon(index);
									}}
								>
									<div
										className={`card rounder-0 border-0 ${
											disabled &&
											selectedCouponIndex !== index
												? 'bg-light'
												: ''
										} ${
											selectedCouponIndex === index
												? 'border-success'
												: ''
										}`}
										style={{
											cursor: disabled
												? 'not-allowed'
												: 'pointer',
										}}
									>
										<div className="light"></div>
										<div className="card-body">
											<h5 className="card-title">
												<img
													src="./pizza/pizza-pie.png"
													className="img-fluid"
													alt="pizza-coupon"
												/>
											</h5>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</DialogBasic>
			)}
		</>
	);
};

DialogCouponContent.propTypes = {
	setTotalCost: PropTypes.func.isRequired,
};

export default DialogCouponContent;
