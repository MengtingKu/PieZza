import 'animate.css';
import AboutStore from '@components/front/AboutStore';
import OurStories from '@components/front/OurStories';
import ChefDelicious from '@components/front/ChefDelicious';
import BookingOrder from '@components/front/BookingOrder';

const AboutUs = () => {
    return (
        <div className="page_bg blog about">
            <div className="container-fluid">
                <div className="container mb-5 ">
                    <div className="page_title">
                        <h3>關於我們</h3>
                        <h6>About Us</h6>
                    </div>
                </div>
            </div>
            <section className="mb-5 about_store">
                <AboutStore />
            </section>

            <section className="mb-5 product_swiper our_stories">
                <OurStories />
            </section>

            <section className="mb-5 chef_delicious overflow-hidden">
                <ChefDelicious />
            </section>

            <section className="mb-5 booking_order">
                <BookingOrder />
            </section>
        </div>
    );
};

export default AboutUs;
