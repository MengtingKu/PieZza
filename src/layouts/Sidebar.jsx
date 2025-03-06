import axios from 'axios';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Icon from '@helper/FontAwesomeIcon';

const Sidebar = () => {
    const [isOpenSidebar, setIsOpenSidebar] = useState(false);
    const navigate = useNavigate();

    const sidebarItems = [
        {
            icon: 'angleLeft',
            tooltip: '隱藏選單',
            onClick: () => setIsOpenSidebar(!isOpenSidebar),
            isToggle: true,
            className: 'button_trigger transform_btn',
        },
        {
            path: '/admin/',
            icon: 'home',
            tooltip: '經營總覽',
            onClick: () => {
                setIsOpenSidebar(false);
            },
            isToggle: false,
            className: 'sidebar_item',
        },
        {
            path: '/admin/product-list',
            icon: 'pizzaSlice',
            tooltip: '產品管理列表',
            onClick: () => {
                setIsOpenSidebar(false);
            },
            isToggle: false,
            className: 'sidebar_item',
        },
        {
            path: '/admin/order-list',
            icon: 'moneyBills',
            tooltip: '訂單管理列表',
            onClick: () => {
                setIsOpenSidebar(false);
            },
            isToggle: false,
            className: 'sidebar_item',
        },
        {
            path: '/admin/article-list',
            icon: 'newspaper',
            tooltip: '文章管理列表',
            onClick: () => {
                setIsOpenSidebar(false);
            },
            isToggle: false,
            className: 'sidebar_item',
        },
        {
            path: '/admin/coupon-list',
            icon: 'discount',
            tooltip: '優惠券管理列表',
            onClick: () => {
                setIsOpenSidebar(false);
            },
            isToggle: false,
            className: 'sidebar_item',
        },
        {
            icon: 'logout',
            tooltip: '登出',
            onClick: async () => {
                try {
                    await axios.post(
                        'https://ec-course-api.hexschool.io/v2/logout'
                    );
                    document.cookie =
                        'reactToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/PieZza;';
                    document.cookie = 'reactToken=; path=/PieZza; max-age=0';
                    localStorage.removeItem('isLoggedIn');
                    navigate('/');
                } catch (error) {
                    // Todo... 吐司訊息串接 api 回傳結果
                    console.log(error);
                    alert('錯誤');
                }
            },
            isToggle: false,
            className: 'sidebar_item mb-3 transform_btn',
        },
    ];

    useEffect(() => {
        const sidebarElement = document.querySelector('.fixed_sidebar');
        const buttonTrigger = document.querySelector('.button_trigger');

        if (isOpenSidebar) {
            sidebarElement.classList.remove('active');
            buttonTrigger.classList.remove('active');
        } else {
            sidebarElement.classList.add('active');
            buttonTrigger.classList.add('active');
        }
    }, [isOpenSidebar]);

    return (
        <aside className="sidebar">
            <ul className="fixed_sidebar">
                {sidebarItems.map(item => {
                    return (
                        <li
                            key={item.tooltip}
                            className={item.className}
                            data-tooltip={item.tooltip}
                            onClick={item.onClick}
                        >
                            {item.path ? (
                                <NavLink
                                    className={({ isActive }) => {
                                        return `nav-link ${
                                            isActive ? 'active' : ''
                                        }`;
                                    }}
                                    to={item.path}
                                >
                                    <Icon icon={item.icon} />
                                </NavLink>
                            ) : (
                                <Icon icon={item.icon} />
                            )}
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
};

export default Sidebar;
