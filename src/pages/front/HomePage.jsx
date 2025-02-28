import BookingOrder from '@components/front/BookingOrder';

const HomePage = () => {
    return (
        <div className="page_bg about home_page">
            <section className="mb-5 booking_order">
                <BookingOrder />
            </section>
        </div>
    );
};

export default HomePage;
