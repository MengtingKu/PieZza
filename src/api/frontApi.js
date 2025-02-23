import request from '@api/axiosInstance';

const frontApi = {
    products: {
        getProductsAll: () => request('get', `/products/all`),
        getProducts: page => request('get', `/products?page=${page}`),
        getProductById: id => request('get', `/product/${id}`),
    },
    cart: {
        getCart: () => request('get', `/cart`),
        postCart: params => request('post', `/cart`, { data: params }),
        putCartById: (id, params) =>
            request('put', `/cart/${id}`, { data: params }),
        deleteCartById: id => request('delete', `/cart/${id}`),
        deleteCarts: () => request('delete', `/carts`),
    },
    coupon: {
        postCoupon: params => request('post', `/coupon`, params),
    },
    order: {
        getOrder: () => request('get', `/orders`),
        getOrderById: order_id => request('get', `/order/${order_id}`),
        postOrderById: params => request('post', `/order`, params),
    },
    pay: {
        postPayById: order_id => request('post', `/pay/${order_id}`),
    },
    article: {
        getArticle: () => request('get', `/articles`),
        getArticleById: article_id => request('get', `/article/${article_id}`),
    },
};

export default frontApi;
