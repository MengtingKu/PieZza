import { useSelector } from 'react-redux';
import { useMemo } from 'react';

const useLoading = () => {
    const {
        isProductLoading,
        isCartLoading,
        isOrderLoading,
        isArticleLoading,
    } = useSelector(state => ({
        isProductLoading: state.product.isProductLoading,
        isCartLoading: state.cart.isCartLoading,
        isOrderLoading: state.order.isOrderLoading,
        isArticleLoading: state.article.isArticleLoading,
    }));

    return useMemo(() => {
        return (
            isProductLoading ||
            isCartLoading ||
            isOrderLoading ||
            isArticleLoading
        );
    }, [isProductLoading, isCartLoading, isOrderLoading, isArticleLoading]);
};

export default useLoading;
