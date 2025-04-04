import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { splitText } from '@helper/stringAndDataHelpers';
import DynamicTable from '@components/common/DynamicTable';
import OrderForm from '@components/front/OrderForm';
import Loading from '@components/common/Loading';

const OrderPage = () => {
	const { isCartLoading, carts } = useSelector(state => state.cart);

	const cartFields = [
		{
			key: 'product_imageUrl',
			class: 'text-start my-1',
			type: 'custom',
			width: '100px',
			render: cart => {
				return (
					<div className="position-relative text-center">
						<img
							src={cart.product_imageUrl}
							alt={cart.product_title}
						/>
						<span className="position-absolute top-0 shopping_qty">
							{cart.qty}
						</span>
					</div>
				);
			},
		},
		{
			key: 'product_title',
			class: 'text-start align-middle',
			type: 'custom',
			render: cart => {
				const { chineseText, engText } = splitText(cart.product_title);
				return (
					<div className="ms-4">
						<div>{chineseText}</div>
						<small>{engText}</small>
					</div>
				);
			},
		},
		{
			key: 'final_total',
			class: 'text-end',
			type: 'number',
		},
	];
	const cartTableFooter = () => {
		return (
			<tfoot>
				<tr>
					<td colSpan={2} className="text-end py-2">
						總計
					</td>
					<td className="text-end">
						<small>
							<del className="text-secondary">
								{carts.total && carts.total.toLocaleString()}
							</del>
						</small>
						<div className="ms-3 text-success fs-5 final_total">
							NT${' '}
							{carts.final_total &&
								carts.final_total.toLocaleString()}
						</div>
					</td>
				</tr>
				<tr>
					<td colSpan={3}>
						<small className="d-block text-end text-success fee description">
							金額已含運費和稅金
						</small>
					</td>
				</tr>
			</tfoot>
		);
	};

	return (
		<div
			className={`container my-4 cart_list checkout ${
				isCartLoading ? 'loading_outerLayer' : ''
			}`}
		>
			{isCartLoading && <Loading />}
			<nav className="my-3" aria-label="breadcrumb">
				<ol className="breadcrumb">
					<li className="breadcrumb-item">
						<Link to="/carts">購物車 pizza cart</Link>
					</li>
					<li
						className="breadcrumb-item fw-bold active"
						aria-current="page"
					>
						填寫訂單 fill in order
					</li>
					<li className="breadcrumb-item text-secondary opacity-50">
						支付方式 Place Order
					</li>
					<li className="breadcrumb-item text-secondary opacity-50">
						完成訂單 Pizza Get!
					</li>
				</ol>
			</nav>
			<div className="page_title my-4">
				<h3>填寫訂單</h3>
				<h6>fill in order</h6>
			</div>

			<div className="row gx-2 my-3 justify-content-between">
				<div className="col-md-5">
					<DynamicTable
						data={carts.carts || []}
						fields={cartFields}
						tFooter={cartTableFooter()}
					/>
				</div>
				<div className="col-md-6">
					<h5 className="mb-1">
						聯繫訊息 <small>Order Information</small>
					</h5>
					<p className="fs-6 mb-5 text-secondary">
						請填寫正確的訊息，好事總是等著你，尤其是這一口！
					</p>
					<OrderForm cartList={carts.carts} />
				</div>
			</div>
		</div>
	);
};

export default OrderPage;
