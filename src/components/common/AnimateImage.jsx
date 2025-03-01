import 'animate.css';
import { useIntersection } from 'react-use';
import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';

const AnimateImage = ({
    src,
    alt,
    className,
    animate = 'animate__fadeInLeft',
}) => {
    const [isInView, setIsInView] = useState(false);
    const intersectionRef = useRef(null);
    const intersection = useIntersection(intersectionRef, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
    });

    useEffect(() => {
        if (intersection && intersection.intersectionRatio >= 0.1) {
            setIsInView(true);
        } else {
            setIsInView(false);
        }
    }, [intersection]);

    return (
        <img
            ref={intersectionRef}
            src={src}
            alt={alt}
            className={`${className} animate__animated ${
                isInView ? animate : ''
            }`}
        />
    );
};

AnimateImage.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    className: PropTypes.string,
    animate: PropTypes.string.isRequired,
};

export default AnimateImage;
