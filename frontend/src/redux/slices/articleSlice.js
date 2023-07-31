import { createSlice } from '@reduxjs/toolkit'
import { addNewArticleThunk, getAllArticlesThunk, getOneArticleThunk } from '../asyncThunks/articlesAsyncThunks'

export const articlesSlice = createSlice({
    name: 'articles',
    initialState: { 
        allArticles: [],
        currentArticle: {},
        isFetching: false, 
    },

    reducers: {
        deleteArticle: (state, action) => {
            state.allArticles = state.allArticles.filter(el => el.id !== action.payload)
        }
    },

    extraReducers: (builder) => {
        builder.addCase(getAllArticlesThunk.pending, (state) => {
            state.isFetching = true
        })
        builder.addCase(getAllArticlesThunk.fulfilled, (state, action) => {
            state.allArticles = action.payload.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
            state.isFetching = false
        })
        builder.addCase(getAllArticlesThunk.rejected, () => {
            alert('ошибка')
        })

        builder.addCase(getOneArticleThunk.pending, (state) => {
            state.isFetching = true
        })
        builder.addCase(getOneArticleThunk.fulfilled, (state, action) => {
            state.currentArticle = action.payload
            state.isFetching = false
        })
        builder.addCase(getOneArticleThunk.rejected, () => {
            alert('ошибка')
        })

        builder.addCase(addNewArticleThunk.pending, (state) => {
            state.isFetching = true
        })
        builder.addCase(addNewArticleThunk.fulfilled, (state, action) => {
            state.allArticles = [action.payload, ...state.allArticles]
            state.isFetching = false
        })
        builder.addCase(addNewArticleThunk.rejected, () => {
            alert('ошибка')
        })
    }
})

export const { deleteArticle } = articlesSlice.actions

export default articlesSlice.reducer
