import { configureStore } from '@reduxjs/toolkit'
import articlesReducer from './slices/articleSlice'
import commentsReducer from './slices/commentsSlice'

export const store = configureStore({
    reducer: {
        articles: articlesReducer,
        comments: commentsReducer,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false
    })
})
