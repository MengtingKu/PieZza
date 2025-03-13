import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonLink from '@components/common/ButtonLink';

const NotFount = () => {
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => navigate('/'), 3000);
    }, [navigate]);

    return (
        <div
            className="d-flex flex-column justify-content-between not_fount"
            style={{ height: '100vh', width: '100%', overflow: 'hidden' }}
        >
            <div className="text-center my-3 content">
                <h2>Oops!</h2>
                <p>為什麼找不到 PieZza...</p>
                <ButtonLink
                    className="btn btn-link text-warning p-3 my-3 animate_on"
                    to="/"
                >
                    Back To Home
                </ButtonLink>
            </div>
            <img
                className="img-fluid only_cheesePie"
                src="https://i.imgur.com/BDh0dlI.png"
                alt="only-cheesePie"
            />
            <h3 className="text">
                <span className="4">4</span>
                <img
                    className="img-fluid only_ring"
                    src="https://i.imgur.com/xmyhMup.png"
                    alt="only-ring"
                />
                <span className="4">4</span>
            </h3>
        </div>
    );
};

export default NotFount;
