import { createSlice } from '@reduxjs/toolkit'
import { addNewCommentThunk, getCommentsThunk } from '../asyncThunks/commentsAsyncThunks'

export const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
        articleComments: [],
        isFetchingComments: false,
        isSendingNewComment: false
    },

    reducers: {
        clearComments: (state) => {
            state.articleComments = []
        }
    },

    extraReducers: (builder) => {
        builder.addCase(getCommentsThunk.pending, (state) => {
            state.isFetchingComments = true
        })
        builder.addCase(getCommentsThunk.fulfilled, (state, action) => {
            state.articleComments = action.payload.sort((a, b) => b.id - a.id)
            state.isFetchingComments = false
        })
        builder.addCase(getCommentsThunk.rejected, () => {
            alert('ошибка')
        })

        builder.addCase(addNewCommentThunk.pending, (state) => {
            state.isSendingNewComment = true
            state.isFetchingComments = true
        })
        builder.addCase(addNewCommentThunk.fulfilled, (state, action) => {
            state.articleComments = [action.payload, ...state.articleComments]
            state.isSendingNewComment = false
            state.isFetchingComments = false
        })
        builder.addCase(addNewCommentThunk.rejected, () => {
            alert('ошибка')
        })
    }
})

export const { clearComments } = commentsSlice.actions

export default commentsSlice.reducer
