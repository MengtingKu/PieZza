import PropTypes from 'prop-types';
import { formatTimestamp } from '@helper/stringAndDataHelpers';

const OrderCollapse = ({ orders }) => {
    return (
        <div className="accordion accordion-flush" id="accordionFlushExample">
            {orders.map(order => {
                return (
                    <div className="accordion-item" key={order.id}>
                        <h2 className="accordion-header">
                            <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#flush-collapse-${order.id}`}
                                aria-expanded="false"
                                aria-controls={`flush-collapse-${order.id}`}
                            >
                                <span className="" style={{ width: '25%' }}>
                                    {formatTimestamp(
                                        order.create_at,
                                        'YYYY-MM-DD'
                                    )}
                                </span>
                                <span style={{ width: '50%' }}>
                                    訂單編號：{order.id}
                                </span>
                                <span
                                    className={`me-3 ${
                                        order.is_paid
                                            ? 'text-success'
                                            : 'text-danger'
                                    }`}
                                    style={{ width: '25%' }}
                                >
                                    {order.is_paid ? '已付款' : '未付款'}
                                </span>
                            </button>
                        </h2>
                        <div
                            id={`flush-collapse-${order.id}`}
                            className="accordion-collapse collapse"
                            data-bs-parent="#accordionFlushExample"
                        >
                            <div className="accordion-body">
                                {Object.values(order.products).map(product => {
                                    return (
                                        <div
                                            className="row g-2 mb-3"
                                            key={product.id}
                                        >
                                            <div className="col-md-3">
                                                <img
                                                    src={
                                                        product.product.imageUrl
                                                    }
                                                    className="img-fluid rounded-start"
                                                    alt={product.product.title}
                                                />
                                            </div>
                                            <div className="col-md-8">
                                                <div className="card-body">
                                                    <h5 className="card-title">
                                                        {product.product.title}
                                                    </h5>
                                                    <p className="card-text">
                                                        {product.product
                                                            .origin_price >
                                                        product.product
                                                            .price ? (
                                                            <span className="text-danger">
                                                                特惠價：
                                                                {
                                                                    product
                                                                        .product
                                                                        .price
                                                                }{' '}
                                                                x {product.qty}{' '}
                                                                ={' '}
                                                                {product.total}
                                                            </span>
                                                        ) : (
                                                            <span>
                                                                單價：
                                                                {
                                                                    product
                                                                        .product
                                                                        .price
                                                                }
                                                                x {product.qty}{' '}
                                                                ={' '}
                                                                {product.total}
                                                            </span>
                                                        )}
                                                    </p>
                                                </div>

                                                <p className="card-text">
                                                    <small className="text-body-secondary">
                                                        {order.message}
                                                    </small>
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

OrderCollapse.propTypes = {
    orders: PropTypes.array.isRequired,
};

export default OrderCollapse;
