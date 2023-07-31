import { DatePicker } from 'antd'
import { useSelector } from 'react-redux'

const { RangePicker } = DatePicker

export const DateFilterForm = ({ setArticles }) => {
    const allArticles = useSelector(store => store.articles.allArticles)

    const onRangeChange = (date, dateStrings) => {
        if (date) {
            const start = Date.parse(dateStrings[0])
            const end = Date.parse(dateStrings[1])
            setArticles(allArticles.filter(article => 
                Date.parse(article.date) > start
                    && 
                Date.parse(article.date) < end
            ))
        } else {
            setArticles(allArticles)
        }
    }

    return (
        <RangePicker onChange={onRangeChange}/>
    )
}
