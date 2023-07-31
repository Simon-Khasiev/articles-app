import { createAsyncThunk } from "@reduxjs/toolkit";
import { commentsApi } from "../commentsApi/commentsApi";

export const getCommentsThunk = createAsyncThunk(
    'comments/getComments', async (id) => {
        const response = await commentsApi.fetchingCommentsByArticleId(id)
        const comments = response.json()
        return comments
    }
)

export const addNewCommentThunk = createAsyncThunk(
    'comments/ addNewComment', async (comment) => {
        const response = await commentsApi.addNewComment(comment)
        const newComment = response.json()
        return newComment
    }
)
