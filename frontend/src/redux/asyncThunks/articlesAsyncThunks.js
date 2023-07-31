import { createAsyncThunk } from '@reduxjs/toolkit';
import { articlesApi } from '../articlesApi/articlesApi';

export const getAllArticlesThunk = createAsyncThunk(
    'articles/getAllArticles', async () => {
        const response = await articlesApi.fetchingAllArticles()
        const data = response.json()
        return data
    }
)

export const getOneArticleThunk = createAsyncThunk(
    'articles/getOneArticle', async (id) => {
        const response = await articlesApi.fetchingArticleById(id)
        const article = response.json()
        return article
    }
)

export const addNewArticleThunk = createAsyncThunk(
    'articles/addNewArticle', async (data) => {
        const response = await articlesApi.addNewArticle(data)
        const article = response.json()
        return article
    }
)
