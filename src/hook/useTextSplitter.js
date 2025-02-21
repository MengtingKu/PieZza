import { useState, useEffect } from 'react';

const useTextSplitter = text => {
    const [splitText, setSplitText] = useState('');

    useEffect(() => {
        const splitTextFunction = () => {
            const result = text.replace(
                /([\u4e00-\u9fa5])\s+([a-zA-Z])/g,
                '$1\n$2'
            );
            setSplitText(result);
        };
        splitTextFunction();
    }, [text]);

    return splitText;
};

export default useTextSplitter;
