import AnimateImage from '@components/common/AnimateImage';

const AboutStore = () => {
    return (
        <div className="container">
            <div className="row g-3 mb-3 justify-content-between">
                <div className="col-md-5 img_group">
                    <AnimateImage
                        src="https://images.unsplash.com/photo-1546724867-3b2dabdbc5b0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                        className="img-fluid store_brand"
                    />
                </div>
                <div className="col-md-6">
                    <div className="title_group">
                        <h6 className="subtitle">About PieZza</h6>
                        <h3 className="title">關於 PieZza</h3>
                    </div>
                    <p>
                        從一開始，我們只是一個充滿熱情的想法，想要創造一個讓每一位顧客都能感受到家的溫暖的披薩店。
                    </p>
                    <p>我們的故事始於對美食的愛與對創新的熱情。</p>
                    <p>
                        我們相信，披薩不僅僅是食物，它是一種能夠將人們連接起來的情感，而這份情感來自於每一塊精心製作的披薩。
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutStore;
