import { AddNewArticleForm } from '../Forms/AddNewArticleForm/AddNewArticleForm'
import { AllArticles } from '../AllArticles/AllArticles'
import { DateFilterForm } from '../Forms/DateFilterForm/DateFilterForm'
import { Space } from 'antd'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import './MainPage.css'

export const MainPage = () => {
    const allArticles = useSelector(store => store.articles.allArticles)

    const [allArticlesState, setAllArticlesState] = useState(allArticles)

    useEffect(() => {
        if(allArticles) setAllArticlesState(allArticles)
    }, [allArticles])

    return(
        <div className='container-mp'>
            <div className='table-mp'>
                <Space direction='vertical'>
                    <DateFilterForm setArticles={setAllArticlesState}/>
                    <AllArticles allArticles={allArticlesState}/>
                </Space>
            </div>
            <div className='form-mp'>
                <AddNewArticleForm />
            </div>
        </div>
    )
}
