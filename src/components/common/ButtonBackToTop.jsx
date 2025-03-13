import { useState } from 'react';
import useScroll from '@hook/useScroll';
import Icon from '@helper/FontAwesomeIcon';

const ButtonBackToTop = () => {
    const [isGoingTop, setIsGoingTop] = useState(false);
    const scrollY = useScroll();
    const scrollToTop = () => {
        setIsGoingTop(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });

        setTimeout(() => setIsGoingTop(false), 2500);
    };

    return (
        <>
            {scrollY > 300 && (
                <button
                    type="button"
                    className="position-fixed overflow-hidden  back_toTop"
                    onClick={() => scrollToTop()}
                >
                    {isGoingTop ? (
                        <span className="position-relative icon_group">
                            <Icon
                                icon="cloud"
                                className="cloud"
                                color="white"
                                size="sm"
                            />
                            <Icon
                                icon="cloud"
                                className="cloud  z-0"
                                color="white"
                                size="xl"
                            />
                            <Icon
                                icon="planeUp"
                                className="z-3 plane"
                                color="#6f42c1"
                                size="xl"
                            />
                        </span>
                    ) : (
                        <Icon icon="arrowUp" color="white" size="2xl" />
                    )}
                </button>
            )}
        </>
    );
};

export default ButtonBackToTop;
