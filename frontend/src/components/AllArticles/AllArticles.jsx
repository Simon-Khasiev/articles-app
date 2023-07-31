import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Input, Space, Table } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import Highlighter from 'react-highlight-words'
import { useNavigate } from 'react-router-dom'
import { deleteArticle } from '../../redux/slices/articleSlice'

export const AllArticles = ({ allArticles }) => {
    
    const [searchText, setSearchText] = useState('')
    const [searchedColumn, setSearchedColumn] = useState('')

    const isFetching = useSelector(store => store.articles.isFetching)
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const searchInput = useRef(null)

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm()
        setSearchText(selectedKeys[0])
        setSearchedColumn(dataIndex)
    }

    const handleReset = (clearFilters) => {
        clearFilters()
        setSearchText('')
    }

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close()
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100)
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    })

    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (text) => <div>{text.slice(0, 10)}</div>,
            width: 200,
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (text) => <div>{text}</div>,
            width: 400,
            ...getColumnSearchProps('title')
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Button
                    onClick={(e) => {
                        e.stopPropagation()
                        dispatch(deleteArticle(record.id))
                    }}
                >
                    delete
                </Button>
            ),
            width: 100,
        }
    ]

    return(
        <Table 
            loading={isFetching}
            columns={columns}
            dataSource={allArticles ? allArticles.map(el => ({...el, key: el.id})) : []}
            onRow={
                (record) => ({
                    onClick: () => {
                        navigate(`/api/articles/${record.id}`)
                    }
                })
            }
            pagination={{pageSize: 5}}
        />
    )
}
