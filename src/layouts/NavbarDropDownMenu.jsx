import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useClickAway, useWindowSize } from 'react-use';
import { Dropdown } from 'bootstrap';
import { getCart, deleteCartItem } from '@slices/cartSlice';
import { splitText } from '@helper/stringAndDataHelpers';
import LinkButton from '@components/common/LinkButton';
import DynamicTable from '@components/common/DynamicTable';
import Icon from '@helper/FontAwesomeIcon';
import DialogDelete from '@components/common/DialogDelete';

const NavbarDropDownMenu = () => {
    const { width } = useWindowSize();
    const dispatch = useDispatch();
    const { carts, isCartLoading } = useSelector(state => state.cart);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);
    const dropdownInstance = useRef(null);
    const [isOpenDropdown, setIsOpenDropdown] = useState(false);
    useClickAway(dropdownRef, () => setIsOpenDropdown(false));

    const dropdownCartFields = [
        {
            key: 'product_imageUrl',
            class: 'text-start my-1',
            type: 'img',
        },
        {
            key: 'product_title',
            class: 'text-start align-middle',
            type: 'custom',
            width: '200px',
            render: cart => {
                const { chineseText, engText } = splitText(cart.product_title);
                return (
                    <div className="ms-4">
                        <div>{chineseText}</div>
                        <div>{engText}</div>
                        <div>
                            NT${' '}
                            {cart.product_price &&
                                cart.product_price.toLocaleString()}
                        </div>
                        <div>Qty: {cart.qty}</div>
                    </div>
                );
            },
        },
        {
            key: 'operation',
            name: '刪除',
            class: 'text-center align-middle',
            type: 'custom',
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
    const dropdownCartFooter = () => {
        return (
            <tfoot>
                <tr>
                    <td className="text-end py-2">總計</td>
                    <td colSpan={2} className="text-end">
                        <small>
                            <del className="text-secondary">
                                {carts.total && carts.total.toLocaleString()}
                            </del>
                            <strong className="ms-3 final_total">
                                NT${' '}
                                {carts.final_total &&
                                    carts.final_total.toLocaleString()}
                            </strong>
                        </small>
                    </td>
                </tr>
            </tfoot>
        );
    };

    const fetchRemoveItem = id => {
        return async dispatch => {
            await dispatch(deleteCartItem(id));
        };
    };

    useEffect(() => {
        dispatch(getCart());
    }, [dispatch]);

    useEffect(() => {
        dropdownInstance.current = new Dropdown(dropdownRef.current, {
            backdrop: true,
        });

        if (isOpenDropdown) {
            dropdownInstance.current.show();
        } else {
            dropdownInstance.current.hide();
        }

        return () => {
            if (dropdownInstance.current) {
                dropdownInstance.current.dispose();
            }
        };
    }, [isOpenDropdown]);

    const openDropdown = () => {
        setIsOpenDropdown(!isOpenDropdown);
    };

    const closeDropdown = () => {
        setIsOpenDropdown(false);
    };

    return (
        <>
            <button
                className="btn p-2 position-relative dropdown_cartBtn"
                type="submit"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
                aria-expanded="false"
                onClick={() => {
                    if (width > 991) {
                        openDropdown();
                    } else {
                        navigate('/carts');
                        closeDropdown();
                    }
                }}
            >
                <Icon icon="basket" />
                <span className="position-absolute top-0 end-0 shopping_qty">
                    {carts.carts.reduce((acc, cur) => acc + cur.qty, 0)}
                </span>
            </button>
            <div
                ref={dropdownRef}
                className={`dropdown-menu dropdown-menu-end p-2 ${
                    !carts.carts.length && 'page_bg'
                }`}
                style={{ height: '500px', overflow: 'scroll' }}
            >
                {' '}
                {carts.carts.length ? (
                    <>
                        <DynamicTable
                            data={carts.carts || []}
                            fields={dropdownCartFields}
                            tFooter={dropdownCartFooter()}
                        />
                        <div className="d-flex">
                            <button
                                type="button"
                                className="btn w-75 text-center btn-sm me-2 to_cartBtn"
                                onClick={() => {
                                    closeDropdown();
                                    navigate('/carts');
                                }}
                            >
                                購物車 <Icon icon="cart" />
                            </button>
                            <button
                                type="button"
                                className="btn w-75 text-center btn-sm ms-2 to_payBtn"
                                onClick={() => {
                                    closeDropdown();
                                    navigate('/checkout');
                                }}
                            >
                                結帳去 <Icon icon="moneyBills" />
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="text-center my-3 lh-lg">
                            <img
                                src="./empty-cart.webp"
                                alt="空購物車"
                                className="img-fluid"
                            />
                            <p className="my-3 text-light">購物車空的...</p>
                            <LinkButton
                                className="btn text-warning animate_on go_shoppingBtn"
                                to="/products"
                                onClickCustom={closeDropdown}
                            >
                                無論何時 <Icon icon="pizzaSlice" /> 為你而來
                            </LinkButton>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default NavbarDropDownMenu;
