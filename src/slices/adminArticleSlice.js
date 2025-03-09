import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import adminApi from '@api/adminApi';

const adminArticleSlice = createSlice({
    name: 'adminArticle',
    initialState: {
        isArticleLoading: false,
        message: null,
        success: null,
        articles: [],
        pagination: {},
        article: {},
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getArticles.fulfilled, (state, action) => {
                state.isLoading = false;
                state.articles = action.payload.articles;
                state.pagination = action.payload.pagination;
            })
            .addCase(getArticleById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.article = action.payload.article;
                state.success = action.payload.success;
            })
            .addMatcher(
                isAnyOf(
                    postArticle.fulfilled,
                    putArticleById.fulfilled,
                    deleteArticle.fulfilled
                ),
                (state, action) => {
                    state.isLoading = false;
                    state.success = action.payload.success;
                    state.message = action.payload.message;
                }
            )
            .addMatcher(
                isAnyOf(
                    getArticles.pending,
                    getArticleById.pending,
                    postArticle.pending,
                    putArticleById.pending,
                    deleteArticle.pending
                ),
                state => {
                    state.isLoading = true;
                    state.message = null;
                }
            )
            .addMatcher(
                isAnyOf(
                    getArticles.rejected,
                    getArticleById.rejected,
                    postArticle.rejected,
                    putArticleById.rejected,
                    deleteArticle.rejected
                ),
                (state, action) => {
                    state.isLoading = false;
                    state.message = action.error.message;
                }
            );
    },
});

export const getArticles = createAsyncThunk(
    'adminOrder/getArticles',
    async (page = 1) => {
        const res = await adminApi.articles.getArticles(page);

        return {
            articles: res.data.articles,
            pagination: res.data.pagination,
        };
    }
);

export const getArticleById = createAsyncThunk(
    'adminOrder/getArticleById',
    async articleId => {
        const res = await adminApi.articles.getArticleById(articleId);

        return {
            article: res.data.article,
            success: res.data.success,
        };
    }
);

export const postArticle = createAsyncThunk(
    'adminOrder/postArticle',
    async ({ params }, { dispatch }) => {
        const body = { data: params };
        const res = await adminApi.articles.postArticle(body);
        dispatch(getArticles());

        return {
            success: res.data.success,
            message: res.data.message,
        };
    }
);

export const putArticleById = createAsyncThunk(
    'adminOrder/putArticleById',
    async ({ id, params }, { dispatch }) => {
        const body = { data: params };
        const res = await adminApi.articles.putArticleById(id, body);
        dispatch(getArticles());

        return {
            success: res.data.success,
            message: res.data.message,
        };
    }
);

export const deleteArticle = createAsyncThunk(
    'adminOrder/deleteArticle',
    async (id, { dispatch }) => {
        const res = await adminApi.articles.deleteArticle(id);
        dispatch(getArticles());

        return {
            success: res.data.success,
            message: res.data.message,
        };
    }
);

export default adminArticleSlice.reducer;
