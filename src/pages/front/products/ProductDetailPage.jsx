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

const ProductDetailPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { products, product, isLoading } = useSelector(
        state => state.product
    );
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

    const splitText = text => {
        if (!text) return '';

        const res = text
            .replace(/([\u4e00-\u9fa5])\s+([a-zA-Z])/g, '$1,$2')
            .split(',');

        const [chineseText, engText] = res;

        return { chineseText, engText };
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
        <div className="container product_detail">
            <nav className="pt-4" aria-label="breadcrumb">
                <ol className="breadcrumb">
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
                    <span className="badge rounded-pill text-bg-warning text-light mb-3 px-3 py-1">
                        <Icon icon="tag" />
                        <span className="ms-2">{product?.category}</span>
                    </span>
                    <h1 className="product_title">
                        {splitText(product?.title).chineseText}
                    </h1>
                    <h3 className="product_title">
                        {splitText(product?.title).engText}
                    </h3>
                    <strong>${product?.price}</strong>{' '}
                    <small className="ms-3">
                        <del>${product?.origin_price}</del>
                    </small>
                    <hr />
                    <p className="lh-lg">{product?.description}</p>
                    <div className="d-flex justify-content-between align-items-center my-4">
                        {/* <div
                            className="d-inline-flex border"
                            role="group"
                            style={{ height: '50px' }}
                        >
                            <button
                                type="button"
                                className="btn border-0 select_btn"
                            >
                                -
                            </button>
                            <input
                                type="number"
                                className="form-control text-center border-0 ms-3"
                                min={1}
                                readOnly
                                style={{ width: '100px' }}
                                value={1}
                            />
                            <button
                                type="button"
                                className="btn border-0 select_btn"
                            >
                                +
                            </button>
                        </div> */}
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
                        <button type="button" className="btn p-2 ">
                            <Icon icon="star" />
                        </button>
                    </div>
                    <button
                        type="button"
                        className="btn btn-outline-primary w-100"
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
