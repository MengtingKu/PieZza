import request from '@api/adminAxiosInstance';

const adminApi = {
    products: {
        getProductsAll: () => request('get', `/products/all`),
        getProducts: page => request('get', `/products?page=${page}`),
        postProduct: params => request('post', `/product`, { data: params }),
        putProductById: id => request('put', `/product/${id}`),
        deleteProduct: id => request('delete', `/product/${id}`),
    },
    order: {
        getOrders: page => request('get', `/orders?page=${page}`),
        putOrderById: (order_id, params) =>
            request('put', `/order/${order_id}`, { data: params }),
        deleteOrderById: order_id => request('delete', `/order/${order_id}`),
        deleteOrders: () => request('delete', `/orders/all`),
    },
    coupon: {
        getCoupons: page => request('get', `/coupons?page=${page}`),
        postCoupon: params => request('post', `/coupon`, { data: params }),
        putCouponsById: (coupon_id, params) =>
            request('put', `/coupon/${coupon_id}`, { data: params }),
        deleteCouponById: coupon_id =>
            request('delete', `/coupon/${coupon_id}`),
    },
    article: {
        getArticles: page => request('get', `/articles?page=${page}`),
        getArticleById: article_id => request('get', `/article/${article_id}`),
        postArticle: params => request('post', `/article`, { data: params }),
        putArticleById: (article_id, params) =>
            request('put', `/article/${article_id}`, { data: params }),
        deleteArticle: article_id =>
            request('delete', `/article/${article_id}`),
    },
};

export default adminApi;
