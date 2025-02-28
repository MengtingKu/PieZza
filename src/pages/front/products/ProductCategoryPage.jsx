import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProductCard from '@components/front/ProductCard';

const ProductCategoryPage = () => {
    const { category } = useParams();
    const { products } = useSelector(state => state.product);
    const filteredProducts =
        category === undefined || category === 'all'
            ? products
            : products.filter(product => product.category === category);

    return (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-5 product_card">
            {filteredProducts.map(product => (
                <div className="col" key={product.id}>
                    <ProductCard product={product} />
                </div>
            ))}
        </div>
    );
};

export default ProductCategoryPage;
