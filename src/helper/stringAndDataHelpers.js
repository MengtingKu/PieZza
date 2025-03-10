import dayjs from 'dayjs';
import { createAsyncMessage } from '@slices/messageSlice';

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
 * 打亂陣列並且依照需求取出指定數量
 * 參考：JS 中打亂陣列 by Hyno
 * @param {Array} arr
 * @param {Number} num
 * @returns
 */
export const getRandomItems = (arr, num) => {
    const shuffled = [...arr];

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled.slice(0, num);
};

/**
 * 把 unix 時間戳轉換城需要的格式 (其他的用 dayjs 直接轉)
 * @param {Number} timestamp
 * @param {String} type
 * @returns {String} - 時間依照需求轉換的樣式
 */
export const formatTimestamp = (timestamp, type = 'YYYY-MM-DD HH:mm:ss') =>
    dayjs.unix(timestamp).format(type);

/**
 * api 回傳訊息統一架構
 * @param {Function} dispatch
 * @param {Boolean} success
 * @param {String, Array} message
 */
export const createMessage = (dispatch, success, message) => {
    dispatch(
        createAsyncMessage({
            id: new Date().getTime(),
            type: success ? 'success' : 'danger',
            text: Array.isArray(message) ? message.join(', ') : message,
            icon: success ? 'circleCheck' : 'circleXmark',
        })
    );
};
