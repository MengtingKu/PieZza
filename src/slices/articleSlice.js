import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import frontApi from '../api/frontApi';

const articleSlice = createSlice({
    name: 'article',
    initialState: {
        isArticleLoading: false,
        message: null,
        success: null,
        articles: [],
        pagination: {},
    },
    reducers: {},
});

export const getArticle = createAsyncThunk('article/getArticle', async () => {
    const res = await frontApi.article.getArticle();
    return {
        success: res.data.success,
        message: res.data.message,
        articles: res.data.articles,
        pagination: res.data.pagination,
    };
});

// todo...先用文件的內容規劃，待確認真的打回來是什麼...這裡有多pagination屬性
export const getArticleById = createAsyncThunk(
    'article/getArticleById',
    async articleId => {
        const res = await frontApi.article.getArticleById(articleId);
        return {
            success: res.data.success,
            message: res.data.message,
            articles: res.data.articles,
            pagination: res.data.pagination,
        };
    }
);

export default articleSlice.reducer;
