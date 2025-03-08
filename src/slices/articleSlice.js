import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import frontApi from '@api/frontApi';

const articleSlice = createSlice({
    name: 'article',
    initialState: {
        isArticleLoading: false,
        message: null,
        success: null,
        articles: null,
        article: null,
        pagination: {},
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getArticle.fulfilled, (state, action) => {
                state.isArticleLoading = false;
                state.articles = action.payload.articles;
                state.pagination = action.payload.pagination;
                state.message = action.payload.message;
                state.success = action.payload.success;
            })
            .addCase(getArticleById.fulfilled, (state, action) => {
                state.isArticleLoading = false;
                state.article = action.payload.article;
                state.success = action.payload.success;
            })
            .addMatcher(
                isAnyOf(getArticle.pending, getArticleById.pending),
                state => {
                    state.isArticleLoading = true;
                    state.message = null;
                }
            )
            .addMatcher(
                isAnyOf(getArticle.rejected, getArticleById.rejected),
                (state, action) => {
                    state.isArticleLoading = false;
                    state.message = action.error.message;
                }
            );
    },
});

export const getArticle = createAsyncThunk('article/getArticle', async () => {
    const res = await frontApi.article.getArticle();
    const grouped = Object.groupBy(
        res.data.articles,
        article => article.category
    );

    return {
        success: res.data.success,
        message: res.data.message,
        articles: { ...grouped },
        pagination: res.data.pagination,
    };
});

export const getArticleById = createAsyncThunk(
    'article/getArticleById',
    async articleId => {
        const res = await frontApi.article.getArticleById(articleId);
        console.log('getArticleById=>', res);

        return {
            success: res.data.success,
            article: res.data.article,
        };
    }
);

export default articleSlice.reducer;
