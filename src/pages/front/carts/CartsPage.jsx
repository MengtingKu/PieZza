import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    getCart,
    putCartItem,
    deleteCartItem,
    deleteCarts,
} from '@slices/cartSlice';
import { splitText } from '@helper/stringAndDataHelpers';
import Icon from '@helper/FontAwesomeIcon';
import DynamicTable from '@components/common/DynamicTable';
import ButtonLink from '@components/common/ButtonLink';
import Loading from '@components/common/Loading';
import DialogDelete from '@components/common/DialogDelete';
import DialogCouponContent from '@components/front/DialogCouponContent';

const CartsPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isCartLoading, carts } = useSelector(state => state.cart);
    const [totalCost, setTotalCost] = useState(0);

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
            name: '總計',
            class: 'text-end',
            type: 'number',
            width: '10%',
        },
        {
            key: 'operation',
            name: '刪除',
            class: 'text-center align-middle',
            type: 'custom',
            width: '10%',
            render: cart => {
                const { chineseText } = splitText(cart.product_title);

                return (
                    <div className="remove_item">
                        <DialogDelete
                            fetchDeleteData={fetchRemoveItem}
                            id={cart.id}
                            className="border-0 text-danger"
                            itemName={chineseText}
                            disabled={isCartLoading}
                        >
                            <Icon icon="remove" size="sm" />
                        </DialogDelete>
                    </div>
                );
            },
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
                key: 'coupon',
                name: '優惠碼',
                class: 'text-success align-middle fs-6',
                render: () => {
                    return (
                        <div className="container">
                            <DialogCouponContent setTotalCost={setTotalCost} />
                        </div>
                    );
                },
            },
            {
                key: 'totalCost',
                name: '折扣價',
                class: 'text-success lh-lg fs-5',
                render: () => {
                    return <span>{totalCost}</span>;
                },
            },
        ];

        return (
            <tfoot>
                {colFields.map(field => {
                    return (
                        <tr key={field.key}>
                            <td
                                colSpan={colSpan}
                                className={`text-end ${field.class}`}
                            >
                                {field.name}
                            </td>
                            <td
                                colSpan={`${cartFields.length - colSpan}`}
                                className={`text-end ${field.class}`}
                            >
                                {field.render && <>{field.render()}</>}
                                {carts[field.key] &&
                                    carts[field.key].toLocaleString()}
                            </td>
                        </tr>
                    );
                })}
            </tfoot>
        );
    };

    const updateItemQty = (cart, qty) => {
        dispatch(
            putCartItem({
                id: cart.id,
                product_id: cart.product_id,
                qty: Number(qty),
            })
        );
    };

    const fetchRemoveItem = id => {
        return async dispatch => {
            await dispatch(deleteCartItem(id));
        };
    };

    const fetchRemoveCartItems = () => {
        return async dispatch => {
            await dispatch(deleteCarts());
        };
    };

    useEffect(() => {
        dispatch(getCart());
    }, [dispatch]);

    useEffect(() => {
        setTotalCost(carts.final_total);
    }, [carts]);

    return (
        <div
            className="container my-5 cart_list coupon"
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
            {isCartLoading && <Loading />}
            {carts.total === 0 ? (
                <div className="text-center mt-3 mb-5 lh-lg">
                    <img
                        src="./empty-cart.webp"
                        alt="空購物車"
                        className="img-fluid"
                    />
                    <p className="my-3">
                        購物車空的... <br />
                    </p>
                    <ButtonLink
                        className="btn animate_on go_shoppingBtn"
                        to="/products"
                    >
                        無論何時 <Icon icon="pizzaSlice" /> 為你而來
                    </ButtonLink>
                </div>
            ) : (
                <>
                    <div className="d-flex justify-content-between align-items-center my-3">
                        <div className="page_title">
                            <h3>購物車清單</h3>
                            <h6>pizza cart</h6>
                        </div>
                        <div className="remove_all">
                            <DialogDelete
                                fetchDeleteData={fetchRemoveCartItems}
                                className="btn btn-outline-danger border-0"
                                itemName="所有美食"
                                disabled={isCartLoading}
                            >
                                <span className="me-2">清空購物車</span>
                                <Icon icon="remove" />
                            </DialogDelete>
                        </div>
                    </div>
                    <DynamicTable
                        data={carts.carts || []}
                        fields={cartFields}
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
