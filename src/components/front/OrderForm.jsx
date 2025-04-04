import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { postOrder } from '@slices/orderSlice';
import { getCart } from '@slices/cartSlice';
import Icon from '@helper/FontAwesomeIcon';
import FormInput from '@components/common/FormInput';

const OrderForm = ({ cartList }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const onSubmit = async data => {
		const { message, ...user } = data;
		const resultAction = await dispatch(postOrder({ user, message }));
		const originalPromiseResult = unwrapResult(resultAction);
		dispatch(getCart());
		reset();

		navigate(`/payment/${originalPromiseResult.orderId}`);
	};

	return (
		<form className="mb-3" onSubmit={handleSubmit(onSubmit)}>
			<FormInput
				register={register}
				errors={errors}
				labelText="收件人郵件信箱"
				id="email"
				icon="email"
				type="email"
				placeholder="kuku@example.com"
				rules={{
					required: '郵件信箱必填 *’ｰ’*',
					pattern: {
						value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
						message: '郵件信箱格式錯誤 *’ｰ’*',
					},
				}}
			/>
			<FormInput
				register={register}
				errors={errors}
				labelText="收件人姓名"
				id="name"
				icon="regularUser"
				type="text"
				placeholder="kuku"
				rules={{ required: '收件人姓名必填 ´・ω・`' }}
			/>
			<FormInput
				register={register}
				errors={errors}
				labelText="收件人連絡電話"
				id="tel"
				icon="phone"
				type="tel"
				placeholder="0911111111"
				rules={{
					required: '電話必填 ๑•́ ₃ •̀๑',
					pattern: {
						value: /^(0[2-8]\d{7}|09\d{8})$/,
						message: '電話號碼格式錯誤 ๑•́ ₃ •̀๑',
					},
				}}
			/>
			<FormInput
				register={register}
				errors={errors}
				labelText="收件人地址"
				id="address"
				icon="address"
				type="text"
				placeholder="岡山県岡山市北区富田町2-2-16 2F"
				rules={{ required: '地址必填 ∑(￣□￣;)' }}
			/>
			<div className="mb-3">
				<label htmlFor="message" className="form-label">
					留言 <Icon icon="message" size="xs" />
				</label>
				<textarea
					{...register('message')}
					id="message"
					className="form-control"
					cols="30"
					rows="10"
				/>
			</div>
			<div className="text-end mb-5">
				{cartList.length ? (
					<button
						className="btn go_shoppingBtn go_checkoutBtn"
						type="submit"
					>
						<span className="me-2">付款 place order</span>
						<Icon icon="angleRight" />
					</button>
				) : (
					<button
						type="button"
						className="btn go_shoppingBtn"
						onClick={() => navigate('/products')}
					>
						<Icon icon="angleLeft" />
						<span className="mx-2"> 購物去 go shopping</span>
						<Icon icon="pizzaSlice" />
					</button>
				)}
			</div>
		</form>
	);
};

OrderForm.propTypes = {
	cartList: PropTypes.array.isRequired,
};

export default OrderForm;
