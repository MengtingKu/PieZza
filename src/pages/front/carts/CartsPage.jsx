import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Icon from '@helper/FontAwesomeIcon';
import DynamicTable from '@components/common/DynamicTable';
import {
    getCart,
    putCartItem,
    deleteCartItem,
    deleteCarts,
} from '@slices/cartSlice';
import { splitText } from '@helper/stringAndDataHelpers';

const CartsPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isCartLoading, carts } = useSelector(state => state.cart);
    const [isToggle, setIsToggle] = useState(false);

    const cartFields = [
        {
            key: 'product_title',
            name: '品名',
            class: 'text-start',
            type: 'custom',
            render: cart => {
                const { chineseText, engText } = splitText(cart.product_title);
                return (
                    <>
                        <div className="row justify-content-around align-items-center gx-3">
                            <div className="col-md-3 my-2">
                                <img src={cart.product_imageUrl} className="" />
                            </div>
                            <div className="col-md-8 ms-4">
                                <div>{chineseText}</div>
                                <div>{engText}</div>
                            </div>
                        </div>
                    </>
                );
            },
        },
        {
            key: 'qty, product_unit',
            name: '數量/單位',
            class: 'text-end ',
            type: 'custom',
            width: '15%',
            render: cart => {
                return (
                    <div className="d-flex align-items-center">
                        <div
                            className="d-inline-flex align-items-center border"
                            role="group"
                            style={{ height: '50px' }}
                        >
                            <button
                                type="button"
                                className="btn border-0 select_qtyBtn"
                                onClick={() =>
                                    updateItemQty(cart, cart.qty - 1)
                                }
                                disabled={cart.qty === 1}
                            >
                                <Icon icon="minus" />
                            </button>
                            <span
                                className="form-control text-center bg-transparent border-0 px-4"
                                style={{ width: '50px', cursor: 'auto' }}
                                readOnly
                            >
                                {cart.qty}
                            </span>
                            <button
                                type="button"
                                className="btn border-0 select_qtyBtn"
                                onClick={() =>
                                    updateItemQty(cart, cart.qty + 1)
                                }
                            >
                                <Icon icon="plus" />
                            </button>
                        </div>

                        <span className="input-group-text bg-transparent border-0">
                            {cart.product_unit}
                        </span>
                    </div>
                );
            },
        },
        {
            key: 'product_price',
            name: '單價',
            class: 'text-end align-middle',
            type: 'custom',
            width: '10%',
            render: cart => {
                return (
                    <>
                        {cart.product_origin_price > cart.product_price ? (
                            <>
                                <div className="text-danger">
                                    {cart.product_price.toLocaleString()}
                                </div>
                                <small className="text-secondary fw-light">
                                    <del>
                                        {cart.product_origin_price.toLocaleString()}
                                    </del>
                                </small>
                            </>
                        ) : (
                            <span>{cart.product_price.toLocaleString()}</span>
                        )}
                    </>
                );
            },
        },
        {
            key: 'total',
            name: '總價',
            class: 'text-end',
            type: 'number',
            width: '10%',
        },
    ];
    const cartTableFooter = () => {
        const colSpan = cartFields.findIndex(
            field => field.key === 'product_price'
        );
        const colFields = [
            {
                key: 'total',
                name: '總計',
                class: 'text-secondary text-decoration-line-through',
            },
            {
                key: 'final_total',
                name: '折扣價',
                class: 'text-success lh-lg fs-5',
            },
        ];

        return (
            <tfoot>
                {colFields.map(field => {
                    return (
                        <tr key={field.key}>
                            <td
                                colSpan={colSpan + 1}
                                className={`text-end ${field.class}`}
                            >
                                {field.name}
                            </td>
                            <td className={`text-end ${field.class}`}>
                                {carts[field.key] &&
                                    carts[field.key].toLocaleString()}
                            </td>
                        </tr>
                    );
                })}
            </tfoot>
        );
    };
    const cartActions = [
        {
            class: `btn btn-sm text-danger ${isToggle && 'fa-shake'}`,
            handler: cart => {
                setIsToggle(true);
                dispatch(deleteCartItem({ id: cart.id }));

                setTimeout(() => {
                    setIsToggle(false);
                }, 1000);
            },
            render: () => {
                return (
                    <>
                        <Icon icon="remove" />
                    </>
                );
            },
        },
    ];

    const updateItemQty = (cart, qty) => {
        dispatch(
            putCartItem({
                id: cart.id,
                product_id: cart.product_id,
                qty: Number(qty),
            })
        );
    };

    useEffect(() => {
        dispatch(getCart());
    }, [dispatch]);

    return (
        <div
            className="container my-5 cart_list"
            style={
                isCartLoading
                    ? {
                          width: '100vw',
                          height: '100vh',
                          overflow: 'hidden',
                      }
                    : {}
            }
        >
            {/* 全面 loading */}
            {isCartLoading && (
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
            {/* 訂單列表 */}
            {carts.total === 0 ? (
                <div className="text-center my-3 lh-lg">
                    <img
                        src="./empty-cart.webp"
                        alt="空購物車"
                        className="img-fluid"
                    />
                    <p className="my-3">
                        購物車空的... <br />
                        <button
                            type="button"
                            className="btn go_shoppingBtn"
                            onClick={() => navigate('/products')}
                        >
                            <span className="ms-2">
                                {' '}
                                無論何時 <Icon icon="pizzaSlice" /> 隨時為你而來
                            </span>
                        </button>
                    </p>
                </div>
            ) : (
                <>
                    <div className="d-flex justify-content-between align-items-center my-3">
                        <div className="page_title">
                            <h3>購物車清單</h3>
                            <h6>pizza cart</h6>
                        </div>
                        <button
                            className="btn btn-outline-danger border-0"
                            type="button"
                            onClick={() => {
                                dispatch(deleteCarts());
                            }}
                            disabled={isCartLoading}
                        >
                            <span className="me-2">清空購物車</span>
                            <Icon icon="remove" />
                        </button>
                    </div>
                    <DynamicTable
                        data={carts.carts || []}
                        fields={cartFields}
                        endActions={cartActions}
                        tFooter={cartTableFooter()}
                    />
                    <div className="d-flex justify-content-end align-items-center mb-2">
                        <button
                            type="button"
                            className="btn go_shoppingBtn"
                            onClick={() => navigate('/products')}
                        >
                            <Icon icon="angleLeft" />
                            <span className="mx-2"> 購物去 go shopping</span>
                            <Icon icon="pizzaSlice" />
                        </button>
                        <span className="mx-3 text-warning">|</span>
                        <button
                            className="btn go_shoppingBtn go_checkoutBtn"
                            type="button"
                            onClick={() => {
                                navigate('/checkout');
                            }}
                            disabled={isCartLoading}
                        >
                            <span className="me-2">
                                結帳去 proceed to checkout
                            </span>
                            <Icon icon="angleRight" />
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartsPage;
