import { Button, Space, Spin } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getOneArticleThunk } from '../../redux/asyncThunks/articlesAsyncThunks'
import { Comments } from '../Comments/Comments'
import { clearComments } from '../../redux/slices/commentsSlice'
import { AddNewCommentForm } from '../Forms/AddNewCommentForm/AddNewCommentForm'
import { CommentOutlined } from '@ant-design/icons'
import './OneArticle.css'

export const OneArticle = () => {
    const { id } = useParams()

    const [isShowComments, setIsShowComments] = useState(false)

    const {currentArticle, isFetching} = useSelector(store => store.articles)
    const dispatch = useDispatch()

    const showCommentsHandler = () => {
        if(isShowComments) dispatch(clearComments())
        setIsShowComments(!isShowComments)
    }

    useEffect(() => {
        dispatch(getOneArticleThunk(id))
    }, [dispatch, id])

    return(
        <div className='container-oa'>
            {
                isFetching ? <Spin /> 
                    :
                <Space direction='vertical'>
                    <div className='title-oa'>
                        {currentArticle?.title}
                    </div>
                    <div>
                        {currentArticle?.text}
                    </div>
                    <AddNewCommentForm id={id} setIsShowComments={setIsShowComments}/>
                    <Space>
                        <Button htmlType='button' onClick={showCommentsHandler} icon={<CommentOutlined />}>
                            {`${isShowComments ? 'hidden' : 'show'} comments`}
                        </Button>
                    </Space>
                    { isShowComments && <Comments id={id}/> }
                </Space>
            }
        </div>
    )
}
