import { Button, Form, Input } from 'antd'
import { validateMessages } from '../AddNewArticleForm/AddNewArticleForm'
import { useDispatch, useSelector } from 'react-redux'
import { addNewCommentThunk } from '../../../redux/asyncThunks/commentsAsyncThunks'
import { SendOutlined } from '@ant-design/icons'

export const AddNewCommentForm = ({ id, setIsShowComments }) => {

    const [form] = Form.useForm()

    const dispatch = useDispatch()

    const onFinish = ({ comment }) => {
        dispatch(addNewCommentThunk({text: comment, article: id}))
        setIsShowComments(true)
        form.resetFields()
    }

    const isSendingNewComment = useSelector(store => store.comments.isSendingNewComment)

    return(
        <Form 
            form={form}
            name="new-comment"
            onFinish={onFinish}
            style={{
                width: 'auto'
            }}
            validateMessages={validateMessages}
        >
            <Form.Item name={'comment'} rules={[{ required: true }]}>
                <Input.TextArea/>
            </Form.Item>
            <Form.Item>
                <Button icon={<SendOutlined />} type="primary" htmlType="submit" loading={isSendingNewComment}>
                    send comment
                </Button>
            </Form.Item>
        </Form>
    )
}
