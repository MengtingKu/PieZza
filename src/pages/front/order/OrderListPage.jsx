import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrder } from '@slices/orderSlice';
import OrderCollapse from '@components/front/OrderCollapse';
import Pagination from '@components/common/Pagination';

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
            className="container my-5 cart_list order_list"
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
