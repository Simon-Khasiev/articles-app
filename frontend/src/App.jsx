import { Route, Routes } from 'react-router-dom'
import { OneArticle } from './components/OneArticle/OneArticle'
import { MainPage } from './components/MainPage/MainPage'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getAllArticlesThunk } from './redux/asyncThunks/articlesAsyncThunks'
import { NotFound } from './components/NotFound/NotFound'

function App() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllArticlesThunk())
    }, [dispatch])

    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/api/articles/:id" element={<OneArticle />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default App
