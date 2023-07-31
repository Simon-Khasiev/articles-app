export const articlesApi = {
    fetchingAllArticles: () => fetch('/api/articles'),

    fetchingArticleById: (id) => fetch(`/api/articles/${id}`),

    addNewArticle: (data) => fetch('/api/articles', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data)
    })
}
