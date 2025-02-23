import { Link } from 'react-router-dom';

const WishList = () => {
    return (
        <div className="container my-4 product_detail cart_list">
            <h3>私藏美味</h3>
            <h6>A Taste That Belongs to Me</h6>
            <nav className="my-3" aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to="/products">Menu</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        私藏美味
                    </li>
                </ol>
            </nav>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-5 mt-2 mb-5 product_card">
                <div className="col">123</div>
                <div className="col">123</div>
                <div className="col">123</div>
                <div className="col">123</div>
            </div>
        </div>
    );
};

export default WishList;
