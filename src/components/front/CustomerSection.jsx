import ModalImage from 'react-modal-image';
import { memoryImages } from '@helper/homePageConfig';
import AnimateImage from '@components/common/AnimateImage';
import LinkButton from '@components/common/LinkButton';

const CustomerSection = () => {
    return (
        <div className="container my-3 pb-3">
            {' '}
            <div className="title_group" style={{ color: '#ffc107' }}>
                <h3 className="title text-center">味道與笑容在這裡相遇</h3>
                <h6 className="subtitle text-center">
                    Where flavors meet smiles
                </h6>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div
                        className="col-sm-6"
                        style={{
                            maxHeight: '400px',
                            minHeight: '200px',
                            overflow: 'hidden',
                        }}
                    >
                        <AnimateImage
                            src={memoryImages.mainImage}
                            alt="Main"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                objectPosition: 'center center',
                            }}
                        />
                    </div>
                    <div className="col-sm-6 px-0">
                        <div className="row row-cols-sm-4">
                            {memoryImages.subImage.map((img, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="col px-0"
                                        style={{
                                            overflow: 'hidden',
                                        }}
                                    >
                                        <ModalImage
                                            small={img.imgUrl}
                                            medium={img.imgUrl}
                                            alt={img.title}
                                            className="memory_image"
                                            style={{
                                                objectFit: 'cover',
                                                objectPosition: 'center center',
                                            }}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className="text-center my-3">
                    <LinkButton
                        className="btn-sm btn-warning opacity-75 border-0 rounded-0"
                        to="/about"
                        target="blank"
                    >
                        認識 PieZza
                    </LinkButton>
                </div>
            </div>
        </div>
    );
};

export default CustomerSection;
