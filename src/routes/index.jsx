import { createHashRouter } from 'react-router-dom';
import FontLayout from '@/FrontApp';
import HomePage from '@pages/front/HomePage';
import ProductsPage from '@pages/front/products/ProductsPage';
import ProductCategoryPage from '@pages/front/products/ProductCategoryPage';
import ProductDetailPage from '@pages/front/products/ProductDetailPage';
import BlogPage from '@pages/front/blog/BlogPage';
import BlogDetail from '@pages/front/blog/BlogDetail';
import AboutUs from '@pages/front/about/AboutUs';
import WishList from '@pages/front/wish/WishList';
import CartsPage from '@pages/front/carts/CartsPage';
import OrderPage from '@pages/front/checkout/OrderPage';
import OrderPayment from '@pages/front/checkout/OrderPayment';
import OrderSuccess from '@pages/front/checkout/OrderSuccess';
import OrderListPage from '@pages/front/order/OrderListPage';

import NotFount from '@pages/NotFount';
import Login from '@pages/LoginForm';

import AdminLayout from '@/AdminApp';
import AdminHome from '@pages/admin/HomePage';
import ProductList from '@pages/admin/ProductList';
import OrderList from '@pages/admin/OrderList';
import ArticleList from '@pages/admin/ArticleList';
import CouponList from '@pages/admin/CouponList';

const routers = [
    {
        path: '/',
        element: <FontLayout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: 'products',
                element: <ProductsPage />,
                children: [
                    {
                        index: true,
                        element: <ProductCategoryPage />,
                    },
                    {
                        path: ':category',
                        element: <ProductCategoryPage />,
                    },
                ],
            },
            {
                path: 'product/:id',
                element: <ProductDetailPage />,
            },
            {
                path: 'blog',
                element: <BlogPage />,
            },
            {
                path: 'blog/:id',
                element: <BlogDetail />,
            },
            {
                path: 'about',
                element: <AboutUs />,
            },
            {
                path: 'wish',
                element: <WishList />,
            },
            {
                path: 'carts',
                element: <CartsPage />,
            },
            {
                path: 'checkout',
                element: <OrderPage />,
            },
            {
                path: 'payment/:orderId',
                element: <OrderPayment />,
            },
            {
                path: 'finish/:orderId',
                element: <OrderSuccess />,
            },
            {
                path: 'orders',
                element: <OrderListPage />,
            },
        ],
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            {
                index: true,
                element: <AdminHome />,
            },
            {
                path: 'product-list',
                element: <ProductList />,
            },
            {
                path: 'order-list',
                element: <OrderList />,
            },
            {
                path: 'article-list',
                element: <ArticleList />,
            },
            {
                path: 'coupon-list',
                element: <CouponList />,
            },
        ],
    },
    {
        path: '*',
        element: <NotFount />,
    },
];

const router = createHashRouter(routers);

export default router;
