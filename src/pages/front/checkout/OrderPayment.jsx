import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderById, postPayById } from '@slices/orderSlice';
import { splitText } from '@helper/stringAndDataHelpers';
import Icon from '@helper/FontAwesomeIcon';
import DynamicTable from '@components/common/DynamicTable';
import Loading from '@components/common/Loading';

const OrderPayment = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isOrderLoading, order } = useSelector(state => state.order);
    const { orderId } = useParams();

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
            width: '100px',
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
                        <div className="ms-3 text-success fs-5 final_total">
                            NT$ {order.total && order.total.toLocaleString()}
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

    const orderFields = [
        {
            key: 'title',
            class: 'text-start',
            type: 'custom',
            render: info => {
                return (
                    <>
                        <span className="d-block my-1">{info.title}：</span>
                    </>
                );
            },
        },
        {
            key: 'value',
            class: 'text-start',
        },
    ];

    const handlePay = orderId => {
        dispatch(postPayById(orderId));
        navigate(`/finish/${order.id}`);
    };

    useEffect(() => {
        dispatch(getOrderById(orderId));
    }, [orderId, dispatch]);

    return (
        <div
            className="container my-4 cart_list checkout"
            style={
                isOrderLoading
                    ? {
                          width: '100vw',
                          height: '100vh',
                          overflow: 'hidden',
                      }
                    : {}
            }
        >
            {isOrderLoading && <Loading />}
            <nav className="my-3" aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/carts">購物車 pizza cart</Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to="/checkout">填寫訂單 fill in order</Link>
                    </li>
                    <li
                        className="breadcrumb-item fw-bold active"
                        aria-current="page"
                    >
                        支付方式 Place Order
                    </li>
                    <li className="breadcrumb-item text-secondary opacity-50">
                        完成訂單 Pizza Get!
                    </li>
                </ol>
            </nav>
            <div className="page_title my-4">
                <h3>支付方式</h3>
                <h6>Place Order</h6>
            </div>
            <div className="payment_notice">
                <Icon icon="info" size="sm" /> 注意事項
                <ul>
                    <li>
                        複製或記住您的訂單號，以便在「我的訂單」頁面中找到或付款。
                    </li>
                    <li>在「我的訂單」中可以查看未付款的訂單。</li>
                    <li>
                        生活很複雜，至少這一口不需要解釋，大口咬下，煩惱放下。
                    </li>
                </ul>
            </div>
            <hr />
            <div className="row g-2 justify-content-between">
                <div className="col-md-5">
                    {' '}
                    <DynamicTable
                        data={order.products || []}
                        fields={cartFields}
                        tFooter={cartTableFooter()}
                    />
                </div>
                <div className="col-md-6 order_info">
                    <h6
                        className={`my-3 ms-1 order_state ${
                            order.is_paid ? 'text-success' : 'text-danger'
                        }`}
                    >
                        {order.is_paid ? (
                            <span>
                                訂單已付款 <small>Pending Payment</small>
                            </span>
                        ) : (
                            <span>
                                訂單待付款 <small>Paid Payment</small>
                            </span>
                        )}
                    </h6>
                    <DynamicTable
                        data={order.info || []}
                        fields={orderFields}
                    />
                </div>

                <div className="text-end mb-2">
                    {!order.is_paid && (
                        <button
                            className="btn go_shoppingBtn go_checkoutBtn"
                            onClick={() => handlePay(order.id)}
                            disabled={order.is_paid}
                        >
                            <span className="me-2">付款 place order</span>
                            <Icon icon="angleRight" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderPayment;
