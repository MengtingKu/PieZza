import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown } from 'bootstrap';
import { useClickAway } from 'react-use';
import DynamicTable from '@components/common/DynamicTable';
import Icon from '@helper/FontAwesomeIcon';
import { getCart, deleteCartItem } from '@slices/cartSlice';
import { splitText } from '@helper/stringAndDataHelpers';

const NavbarDropDownMenu = () => {
    const dispatch = useDispatch();
    const { carts } = useSelector(state => state.cart);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);
    const dropdownInstance = useRef(null);
    const [isOpenDropdown, setIsOpenDropdown] = useState(false);
    const [isToggle, setIsToggle] = useState(false);
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
    const dropdownCartActions = [
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

    useEffect(() => {
        dispatch(getCart());
    }, [dispatch]);

    useEffect(() => {
        dropdownInstance.current = new Dropdown(dropdownRef.current, {
            backdrop: false,
        });
        console.log('test=>', isOpenDropdown);

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
                onClick={() => openDropdown()}
            >
                <Icon icon="basket" />
                <span className="position-absolute top-0 end-0 shopping_qty">
                    {carts.carts.reduce((acc, cur) => acc + cur.qty, 0)}
                </span>
            </button>
            <div
                ref={dropdownRef}
                className="dropdown-menu dropdown-menu-end p-2"
                style={{ height: '500px', overflow: 'scroll' }}
            >
                {' '}
                {carts.carts.length ? (
                    <>
                        <DynamicTable
                            data={carts.carts || []}
                            fields={dropdownCartFields}
                            endActions={dropdownCartActions}
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
                    <>還沒有商品</>
                )}
            </div>
        </>
    );
};

export default NavbarDropDownMenu;
