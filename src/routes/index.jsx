import { createHashRouter } from 'react-router-dom';
import FontLayout from '@/FrontApp';
import HomePage from '@pages/front/HomePage';
import ProductsPage from '@pages/front/products/ProductsPage';
import ProductCategoryPage from '@pages/front/products/ProductCategoryPage';
import ProductDetailPage from '@pages/front/products/ProductDetailPage';
import ArticlesPage from '@pages/front/ArticlesPage';
import AboutUs from '@pages/front/AboutUs';
import CartsPage from '@pages/front/CartsPage';

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
                path: 'articles',
                element: <ArticlesPage />,
            },
            {
                path: 'about',
                element: <AboutUs />,
            },
            {
                path: 'carts',
                element: <CartsPage />,
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
