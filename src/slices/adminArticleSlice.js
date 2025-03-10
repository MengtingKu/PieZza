import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import adminApi from '@api/adminApi';
import { createMessage } from '@helper/stringAndDataHelpers';

const adminArticleSlice = createSlice({
    name: 'adminArticle',
    initialState: {
        isArticleLoading: false,
        articles: [],
        pagination: {},
        article: {},
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getArticles.fulfilled, (state, action) => {
                state.isArticleLoading = false;
                state.articles = action.payload.articles;
                state.pagination = action.payload.pagination;
            })
            .addCase(getArticleById.fulfilled, (state, action) => {
                state.isArticleLoading = false;
                state.article = action.payload.article;
            })
            .addMatcher(
                isAnyOf(
                    postArticle.fulfilled,
                    putArticleById.fulfilled,
                    deleteArticle.fulfilled
                ),
                state => {
                    state.isArticleLoading = false;
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
                    state.isArticleLoading = true;
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
                state => {
                    state.isArticleLoading = false;
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
        };
    }
);

export const postArticle = createAsyncThunk(
    'adminOrder/postArticle',
    async ({ params }, { dispatch }) => {
        const body = { data: params };
        try {
            const res = await adminApi.articles.postArticle(body);
            createMessage(dispatch, res.data.success, res.data.message);

            dispatch(getArticles());
        } catch (error) {
            createMessage(dispatch, false, error?.response?.data?.message);
        }
    }
);

export const putArticleById = createAsyncThunk(
    'adminOrder/putArticleById',
    async ({ id, params }, { dispatch }) => {
        const body = { data: params };
        try {
            const res = await adminApi.articles.putArticleById(id, body);
            createMessage(dispatch, res.data.success, res.data.message);

            dispatch(getArticles());
        } catch (error) {
            createMessage(dispatch, false, error?.response?.data?.message);
        }
    }
);

export const deleteArticle = createAsyncThunk(
    'adminOrder/deleteArticle',
    async (id, { dispatch }) => {
        try {
            const res = await adminApi.articles.deleteArticle(id);
            createMessage(dispatch, res.data.success, res.data.message);

            dispatch(getArticles());
        } catch (error) {
            createMessage(dispatch, false, error?.response?.data?.message);
        }
    }
);

export default adminArticleSlice.reducer;
