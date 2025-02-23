// 中英文本分割
export const splitText = text => {
    if (!text) return '';

    const res = text
        .replace(/([\u4e00-\u9fa5])\s+([a-zA-Z])/g, '$1,$2')
        .split(',');

    const [chineseText, engText] = res;

    return { chineseText, engText };
};
