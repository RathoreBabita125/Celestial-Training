import { createContext, useEffect, useState } from "react";
import { getComment } from "../api/comment_api";

export const CommentContext = createContext()

export const CommentProvider = ({ children }) => {

    const [myComments, setMyComments] = useState([])

    const [newComment, setNewComment] = useState({
        name: '',
        email: '',
        body: ''
    })

    const [updateComment, setUpdateComment] = useState({})

    const getCommentData = async () => {
        const comments = await getComment()
        setMyComments(comments.data)
    }

    useEffect(() => {
        getCommentData()
    }, [])

    useEffect(() => {
        setNewComment({
            name: updateComment.name,
            email: updateComment.email,
            body: updateComment.body
        })
    }, [updateComment])

    return (
        <CommentContext.Provider value={{
            myComments,
            setMyComments,
            newComment,
            setNewComment,
            updateComment,
            setUpdateComment
        }}>
            {children}
        </CommentContext.Provider>
    )

}



