import axios from 'axios'

const api=axios.create({
    baseURL:'https://jsonplaceholder.typicode.com'
})

export const getComment=()=>{
    return  api.get('/comments',{
        params:{
            _limit:15
        }
    })
}

export const postComment=(comment)=>{
    return api.post('/comments', comment)
}

export const editComment=(id, comment)=>{
    return api.put(`/comments/${id}`, comment)
}

export const deleteComment=(id)=>{
    return api.delete(`/comments/${id}`)
}