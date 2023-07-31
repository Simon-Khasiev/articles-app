import { Button, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { addNewArticleThunk } from '../../../redux/asyncThunks/articlesAsyncThunks';

const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 20,
    }
}

export const validateMessages = {
    // eslint-disable-next-line
    required: '${label} is required!',
}

export const AddNewArticleForm = () => {

    const [form] = Form.useForm()

    const dispatch = useDispatch()

    const onFinish = ({ article }) => {
        dispatch(addNewArticleThunk(article))
        form.resetFields()
    }

    return(
        <Form
            form={form}
            {...layout}
            name="new-article"
            onFinish={onFinish}
            style={{
                width: '100%'
            }}
            validateMessages={validateMessages}
        >
            <Form.Item name={['article', 'title']} label="Title" rules={[{ required: true }]}>
                <Input.TextArea />
            </Form.Item>
            <Form.Item name={['article', 'text']} label="Text" rules={[{ required: true }]}>
                <Input.TextArea />
            </Form.Item>
            <Form.Item
                wrapperCol={{
                    ...layout.wrapperCol,
                    offset: 4,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Add article
                </Button>
            </Form.Item>
        </Form>
    )
}
