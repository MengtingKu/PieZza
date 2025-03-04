import { outstanding } from '@helper/homePageConfig';
import AnimateImage from '@components/common/AnimateImage';

const OutstandingSection = () => {
    return (
        <div className="container px-5">
            <div className="title_group" style={{ color: '#ffc107' }}>
                <h3 className="title text-center">我們的優勢</h3>
                <h6 className="subtitle text-center">why choose us?</h6>
            </div>
            <div className="row g-5">
                {outstanding.map(item => {
                    return (
                        <div
                            className="col-md-4 text-center block"
                            key={item.title}
                        >
                            <AnimateImage
                                src={item.imgUrl}
                                alt={item.description}
                                className="my-3"
                                style={{
                                    width: '90px',
                                    height: '90px',
                                }}
                            />
                            <h4 className="my-3">{item.title}</h4>
                            <p className="text-start">{item.content}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default OutstandingSection;
