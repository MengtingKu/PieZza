import { useSelector } from 'react-redux';

const OrderListPage = () => {
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
            <div className="page_title my-4">
                <h3>我的訂單</h3>
                <h6>My orders</h6>
            </div>
        </div>
    );
};

export default OrderListPage;
