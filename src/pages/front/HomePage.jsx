import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getOrder } from '@slices/orderSlice';
import BannerSection from '@components/front/BannerSection';
import OutstandingSection from '@components/front/OutstandingSection';
import SaleSection from '@components/front/SaleSection';
import BookingOrder from '@components/front/BookingOrder';
import ChefDelicious from '@components/front/ChefDelicious';
import CustomerSection from '@components/front/CustomerSection';

const HomePage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOrder());
    }, [dispatch]);

    return (
        <div className="page_bg container-fluid px-0 about home_page">
            <section className="mb-5 banner_section">
                <BannerSection />
            </section>

            <section className="mb-5 outstanding_section">
                <OutstandingSection />
            </section>

            <section className="mb-5 sale_section">
                <SaleSection />
            </section>

            <section className="mb-5 customer_section">
                <CustomerSection />
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

export default HomePage;
