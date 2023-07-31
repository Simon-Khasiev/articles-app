export const commentsApi = {
    fetchingCommentsByArticleId: (id) => fetch(`/api/comments?article=${id}`),
    
    addNewComment: (comment) => fetch('/api/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(comment)
    })
}
