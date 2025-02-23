import 'animate.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Thumbs } from 'swiper/modules';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getProducts, getProductById } from '@slices/productSlice';
import { postCart } from '@slices/cartSlice';
import Icon from '@helper/FontAwesomeIcon';
import { splitText } from '@helper/splitText';

const ProductDetailPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { products, product } = useSelector(state => state.product);
    const [selectItemNum, setSelectItemNum] = useState(1);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    // 參考：JS 中打亂陣列 by Hyno
    const getRandomItems = (arr, num) => {
        const shuffled = [...arr];

        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        return shuffled.slice(0, num);
    };

    const swiperImgs = () => {
        if (!product) return null;

        const { imageUrl, imagesUrl } = product;

        return [imageUrl, ...imagesUrl].map((img, index) => (
            <SwiperSlide key={index}>
                <img src={img} className="rounded" />
            </SwiperSlide>
        ));
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(getProductById(id));
    }, [id, dispatch]);

    useEffect(() => {
        if (products.length === 0) {
            dispatch(getProducts());
        }
    }, [dispatch, products.length]);

    // if (isLoading) {
    //     return <>想睡...休息一下 ¯﹃¯</>;
    // }

    return (
        <div className="container my-3 product_list product_detail">
            <nav className="pt-4" aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to="/products">Menu</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        {product?.title}
                    </li>
                </ol>
            </nav>
            <div className="row g-4 py-3 mb-5">
                <div className="col-md-6">
                    <div className="h-100 product_swiper">
                        <Swiper
                            spaceBetween={10}
                            thumbs={{ swiper: thumbsSwiper }}
                            modules={[FreeMode, Thumbs]}
                            className="mySwiper2"
                        >
                            {swiperImgs()}
                        </Swiper>
                        <Swiper
                            onSwiper={setThumbsSwiper}
                            spaceBetween={10}
                            slidesPerView={5}
                            freeMode={true}
                            watchSlidesProgress={true}
                            modules={[FreeMode, Thumbs]}
                            className="mySwiper"
                        >
                            {swiperImgs()}
                        </Swiper>
                    </div>
                </div>
                <div className="col-md-5 detail_content">
                    <div className="content_text">
                        <span className="badge rounded-pill mb-3 px-3 py-1 category_tag">
                            <Icon icon="tag" />
                            <span className="ms-2">{product?.category}</span>
                        </span>
                        <h1 className="product_title">
                            {splitText(product?.title).chineseText}
                        </h1>
                        <h3 className="product_subtitle">
                            {splitText(product?.title).engText}
                        </h3>
                        <span
                            className={`unit_price fw-bolder me-2 fs-3 ${
                                product?.origin_price > product?.price &&
                                'text-danger'
                            }`}
                        >
                            NT$ {product?.price}
                        </span>
                        {product?.origin_price > product?.price && (
                            <span className="unit_price fs-6 text-secondary fw-light opacity-50 text-decoration-line-through">
                                NT$ {product?.origin_price}
                            </span>
                        )}
                        <hr />
                        <p className="lh-lg">{product?.description}</p>
                    </div>
                    <div className="my-3 position-relative">
                        <div className="input-group align-items-center w-75">
                            <select
                                value={selectItemNum}
                                onChange={e =>
                                    setSelectItemNum(Number(e.target.value))
                                }
                                id="qtySelect"
                                className="form-select text-center"
                            >
                                {new Array(10)
                                    .fill(0)
                                    .map((_, index) => index + 1)
                                    .map(val => (
                                        <option key={val} value={val}>
                                            {val} {product?.unit}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div className="position-relative mt-3">
                            <button
                                type="button"
                                className="btn w-100 add_toCartBtn"
                                onClick={() =>
                                    dispatch(
                                        postCart({
                                            product_id: product?.id,
                                            qty: selectItemNum,
                                        })
                                    )
                                }
                            >
                                加入購物車 <Icon icon="cart" />
                            </button>
                        </div>

                        <span className="position-absolute top-0 end-0 wish_mark">
                            <Icon icon="star" />
                        </span>
                    </div>
                </div>
            </div>
            <hr />
            <div className="my-3 special_list">
                <h3 className="border-2 border-secondary special_title my-4">
                    今日特選
                </h3>
                <Swiper
                    spaceBetween={20}
                    slidesPerView={5}
                    autoplay={{
                        delay: 1000,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        320: { slidesPerView: 2, spaceBetween: 10 },
                        480: { slidesPerView: 2, spaceBetween: 15 },
                        768: { slidesPerView: 3, spaceBetween: 20 },
                        1024: { slidesPerView: 5, spaceBetween: 30 },
                    }}
                >
                    {getRandomItems(products, 5).map(product => {
                        return (
                            <SwiperSlide key={product.id}>
                                <img
                                    src={product.imageUrl}
                                    alt={product.title}
                                    className="rotate special_img d-block"
                                    onClick={() =>
                                        navigate(`/product/${product.id}`)
                                    }
                                />
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </div>
    );
};

export default ProductDetailPage;
