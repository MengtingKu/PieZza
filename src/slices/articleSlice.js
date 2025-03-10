import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import frontApi from '@api/frontApi';

const articleSlice = createSlice({
    name: 'article',
    initialState: {
        isArticleLoading: false,
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
            })
            .addCase(getArticleById.fulfilled, (state, action) => {
                state.isArticleLoading = false;
                state.article = action.payload.article;
            })
            .addMatcher(
                isAnyOf(getArticle.pending, getArticleById.pending),
                state => {
                    state.isArticleLoading = true;
                }
            )
            .addMatcher(
                isAnyOf(getArticle.rejected, getArticleById.rejected),
                state => {
                    state.isArticleLoading = false;
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
        articles: { ...grouped },
        pagination: res.data.pagination,
    };
});

export const getArticleById = createAsyncThunk(
    'article/getArticleById',
    async articleId => {
        const res = await frontApi.article.getArticleById(articleId);

        return {
            article: res.data.article,
        };
    }
);

export default articleSlice.reducer;
