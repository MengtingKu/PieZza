import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { stories } from '@helper/ourStoryConfig';

const OurStories = () => {
    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
            return (
                '<span class="' +
                className +
                '">' +
                '<span class="page_year">' +
                (index + 2023) +
                '</span>' +
                '</span>'
            );
        },
    };

    const swiperStories = () => {
        return stories.map(story => (
            <SwiperSlide key={story.id}>
                <div
                    className="card"
                    style={{
                        fontFamily: 'Caveat Brush',
                        letterSpacing: '1px',
                    }}
                >
                    <div className="row g-3 justify-content-between">
                        <div className="col-md-5 position-relative">
                            <img
                                src={story.imgUrl}
                                className="img-fluid"
                                alt={story.title}
                            />
                            <span
                                className="position-absolute start-100 translate-middle badge rounded-pill bg-warning px-3"
                                style={{ top: '26px' }}
                            >
                                {story.tag}
                            </span>
                        </div>
                        <div className="col-md-6">
                            <div className="card-body ps-md-0">
                                <h5 className="card-title fs-4 fw-bold mb-3">
                                    {story.title}
                                </h5>
                                {story.content.map(text => {
                                    return (
                                        <p
                                            className="card-text fs-6"
                                            key={text}
                                        >
                                            {text}
                                        </p>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </SwiperSlide>
        ));
    };

    return (
        <div className="container">
            <div className="title_group">
                <h3 className="title text-center">我們的故事</h3>
                <h6 className="subtitle text-center">Our Stories</h6>
            </div>
            <div className="swiper_timeline my-5">
                <Swiper
                    pagination={pagination}
                    modules={[Autoplay, Pagination]}
                    className="mySwiper"
                    speed={600}
                    autoplay={{
                        delay: 2800,
                        disableOnInteraction: true,
                    }}
                >
                    {swiperStories()}
                </Swiper>
            </div>
        </div>
    );
};

export default OurStories;
