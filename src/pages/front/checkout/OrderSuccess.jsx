import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Icon from '@helper/FontAwesomeIcon';

const OrderSuccess = () => {
    const navigate = useNavigate();
    const { orderId } = useParams();
    const { isOrderLoading } = useSelector(state => state.order);

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
            {isOrderLoading && (
                <div
                    className="d-flex justify-content-center align-items-center"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: 'rgba(255,255,255,0.3)',
                        zIndex: 999,
                    }}
                >
                    {' '}
                    loading...
                </div>
            )}
            <nav className="my-3" aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/carts">購物車 pizza cart</Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to="/checkout">填寫訂單 fill in order</Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to={`/payment/${orderId}`}>
                            支付方式 Place Order
                        </Link>
                    </li>
                    <li
                        className="breadcrumb-item fw-bold active"
                        aria-current="page"
                    >
                        完成訂單 Pizza Get!
                    </li>
                </ol>
            </nav>
            <div className="page_title my-4">
                <h3>完成訂單</h3>
                <h6>Pizza Get!</h6>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center mb-3">
                <h6 className="text-success">
                    <Icon icon="halfStar" color="gold" />
                    開吃啦 ٩(๑•̀ω•́๑)۶
                    <Icon
                        icon="halfStar"
                        color="gold"
                        className="fa-flip-horizontal"
                    />
                </h6>
                <h5 className="text-success fw-bold py-2">交易已成功</h5>
                <div className="d-flex align-items-center my-3 position-relative">
                    <div className="user_avatar">
                        <Icon icon="user" />
                    </div>
                    <div className="connect_lines">
                        <span className="mx-3 stage_bar"></span>
                        <span className="text-danger">
                            {new Array(3).fill(0).map((_, index) => {
                                return (
                                    <Icon
                                        key={index}
                                        icon="fire"
                                        className="fa-fade"
                                    />
                                );
                            })}
                        </span>
                    </div>

                    <div className="user_avatar">
                        <Icon icon="user" />
                    </div>

                    <img
                        className="baked_pizza"
                        src="./margherita-pizza.webp"
                        alt="pizza"
                    />
                </div>
                <div className="my-3 text-center lh-lg position-relative">
                    訂單編號：
                    <Link to={`/payment/${orderId}`}>{orderId}</Link> 完成付款，
                    <br />
                    此時就是你最需要的時刻，我們會盡快為您準備餐點！
                    <img
                        className="position-absolute success_stamp"
                        src="./pay-success.webp"
                        alt="stamp"
                    />
                </div>
            </div>
            <div className="d-flex justify-content-center align-items-center my-5">
                <button
                    className="btn go_shoppingBtn go_checkoutBtn"
                    type="button"
                    onClick={() => {
                        navigate('/orders');
                    }}
                >
                    <Icon icon="angleLeft" />
                    <span className="mx-2">查看訂單 view orders</span>
                    <Icon icon="order" />
                </button>
                <span className="mx-3 text-warning">|</span>
                <button
                    type="button"
                    className="btn go_shoppingBtn"
                    onClick={() => navigate('/products')}
                >
                    <Icon icon="basket" />
                    <span className="mx-2">逛逛 go around</span>
                    <Icon icon="angleRight" />
                </button>
            </div>
        </div>
    );
};

export default OrderSuccess;
