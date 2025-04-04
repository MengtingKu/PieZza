import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Parallax, Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import arrow from '@assets/common/arrow.svg';
import ButtonLink from '@components/common/ButtonLink';

const BannerSection = () => {
	return (
		<Swiper
			style={{
				'--swiper-navigation-color': '#fff',
				'--swiper-pagination-color': '#fff',
			}}
			speed={600}
			autoplay={{
				delay: 28000,
				disableOnInteraction: false,
			}}
			parallax={true}
			pagination={{
				clickable: true,
			}}
			navigation={true}
			modules={[Autoplay, Parallax, Pagination, Navigation]}
			className="mySwiper"
		>
			<div
				slot="container-start"
				className="parallax-bg"
				style={{
					backgroundImage: 'url(./banner/banner-bg.png)',
				}}
				data-swiper-parallax="-23%"
			/>
			<SwiperSlide>
				<div className="row">
					<div className="col-md-7 title_group">
						<div className="title" data-swiper-parallax="-300">
							PieZza 每口<span>Pie</span>都充滿愛
						</div>
						<div className="subtitle" data-swiper-parallax="-200">
							lifelong memories just a few bites always
						</div>
						<div className="text" data-swiper-parallax="-100">
							<Link
								to="/products"
								type="button"
								className="btn btn-link text-warning"
							>
								立即選購 <img src={arrow} alt="arrow" />
							</Link>
						</div>
					</div>
					<div
						className="col-md-5 position-relative"
						style={{ height: '300px' }}
					>
						<img
							src="./banner/love-together.webp"
							alt="lead"
							className="main_image love_together"
						/>
						<img
							src="./banner/heart.png"
							alt="support"
							className="img_animate group1_img1"
							style={{ width: '60px' }}
						/>
						<img
							src="./banner/heart.png"
							alt="support"
							className="img_animate group1_img2"
							style={{ width: '90px' }}
						/>
					</div>
				</div>
			</SwiperSlide>
			<SwiperSlide>
				<div className="row">
					<div className="col-md-7 title_group">
						<div className="title" data-swiper-parallax="-300">
							在家享受吃<span>大</span>餐
						</div>
						<div className="subtitle" data-swiper-parallax="-200">
							order food to your door
						</div>
						<div className="text" data-swiper-parallax="-100">
							<Link
								to="/products"
								type="button"
								className="btn btn-link text-warning"
							>
								線上選購 <img src={arrow} alt="arrow" />
							</Link>
						</div>
					</div>
					<div
						className="col-md-5 position-relative"
						style={{ height: '300px' }}
					>
						<img
							src="./banner/house-pizza.png"
							alt="lead"
							className="main_image house_pizza"
						/>
						<img
							src="./banner/celery-leaves.png"
							alt="support"
							className="img_animate group2_img1"
							style={{ width: '60px' }}
						/>
						<img
							src="./banner/garlic.png"
							alt="support"
							className="img_animate group2_img2"
							style={{ width: '50px' }}
						/>
						<img
							src="./banner/sugar-beet.png"
							alt="support"
							className="img_animate group2_img3"
							style={{ width: '50px' }}
						/>
						<img
							src="./banner/tomato.png"
							alt="support"
							className="img_animate group2_img4"
							style={{ width: '50px' }}
						/>
					</div>
				</div>
			</SwiperSlide>
			<SwiperSlide>
				<div className="row">
					<div className="col-md-7 title_group">
						<div className="title" data-swiper-parallax="-300">
							又有<span>新</span>折扣
						</div>
						<div className="subtitle" data-swiper-parallax="-200">
							what excites you most? ๑• ‿ •๑
						</div>
						<div className="text mt-2" data-swiper-parallax="-100">
							<ButtonLink
								className="btn btn-link text-warning p-0 animate_on"
								to="/blog"
								target="blank"
							>
								10% OFF Coupon <img src={arrow} alt="arrow" />
							</ButtonLink>
						</div>
					</div>
					<div
						className="col-md-5 position-relative"
						style={{ height: '300px' }}
					>
						<img
							src="./banner/floating-pizza.png"
							alt="lead"
							className="main_image floating_pizza"
						/>
						<img
							src="./banner/cheese.png"
							alt="support"
							className="img_animate group3_img1"
							style={{ width: '60px' }}
						/>
						<img
							src="./banner/mushroom.png"
							alt="support"
							className="img_animate group3_img2"
							style={{ width: '50px' }}
						/>
						<img
							src="./banner/black-olive.png"
							alt="support"
							className="img_animate group3_img3"
							style={{ width: '25px' }}
						/>
						<img
							src="./banner/tomato.png"
							alt="support"
							className="img_animate group3_img4"
							style={{ width: '35px' }}
						/>
						<img
							src="./banner/chili.png"
							alt="support"
							className="img_animate group3_img5"
							style={{ width: '50px' }}
						/>
					</div>
				</div>
			</SwiperSlide>
		</Swiper>
	);
};

export default BannerSection;
