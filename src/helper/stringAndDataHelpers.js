import dayjs from 'dayjs';

/**
 * 中英文本分割
 * @param {String} text - API 回傳的產品名稱
 * @returns {Object} - 轉換後會變成中文標題和英文標題屬性值
 */
export const splitText = text => {
    if (!text) return '';

    const res = text
        .replace(/([\u4e00-\u9fa5])\s+([a-zA-Z])/g, '$1,$2')
        .split(',');

    const [chineseText, engText] = res;

    return { chineseText, engText };
};

/**
 * 將 API 回傳的購物車資料轉換為表格所需的結構
 * @param {Array} arrayData - API 回傳的資料
 * @returns {Array} - 轉換後的表格資料
 */
export const transformTableData = arrayData => {
    return arrayData?.map(item => {
        const flatItem = { ...item };
        for (const [key, value] of Object.entries(item.product)) {
            flatItem[`product_${key}`] = value;
        }
        return flatItem;
    });
};

/**
 * 把時間戳轉換城需要的格式
 * @param {Number} timestamp
 * @param {String} type
 * @returns {String} - 時間依照需求轉換的樣式
 */
export const formatTimestamp = (timestamp, type = 'YYYY-MM-DD HH:mm:ss') =>
    dayjs.unix(timestamp).format(type);
