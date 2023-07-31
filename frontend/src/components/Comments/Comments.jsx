import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCommentsThunk } from '../../redux/asyncThunks/commentsAsyncThunks'
import { Space, Spin } from 'antd'
import './Comments.css'

export const Comments = ({id}) => {
    
    const { articleComments, isFetchingComments } = useSelector(store => store.comments)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCommentsThunk(id))
    }, [dispatch, id])

    return (
        <>{ isFetchingComments ? <Spin/> :
            <div className='container-comments'>
                { !!articleComments.length ?
                    <Space direction="vertical" size={'large'}>
                        {articleComments.map(comment => 
                            <Space 
                                key={comment.id} 
                                direction="vertical"
                                className='comment'
                            >
                                <div className='username-cmt'>
                                    {!!comment.user ? `${comment.user} wrote:` : 'Anonimous:'}
                                </div>
                                <div className='text-cmt'>
                                    {comment.text}
                                </div>
                            </Space>
                        )}
                    </Space> : <div>No comments</div>
                }
            </div>}
        </>
    )
}
