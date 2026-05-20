import { useContext } from "react"
import { editComment, postComment } from "../api/comment_api"
import { CommentContext } from "../context/comment_context.jsx"

const Form = () => {

     const {myComments,setMyComments,newComment,setNewComment, updateComment, setUpdateComment}=useContext(CommentContext)
    

    const handleSubmitButton = async (e) => {
        e.preventDefault()

        const action = e.nativeEvent.submitter.value

        if (action === 'Add Comment') {
            addCommentData()
        }
        else if (action === 'Edit Comment') {
            editCommentData()
        }
    }

    
    const handleInputButton = (e) => {
        const name = e.target.name
        const value = e.target.value

        return setNewComment((pre) => {
            return { ...pre, [name]: value }
        })
    }

    const isEmptyEditComment = Object.keys(updateComment).length == 0

    const editCommentData = () => {

        const comment = editComment(updateComment.id, newComment)

        if (comment.status === 200) {
            setMyComments((pre) => {
                return pre.map((currComment) => {
                    return currComment.id === updateComment.id ? comment.data : currComment
                })
            })
        }

        setUpdateComment({})

        setNewComment({
            name: '',
            email: '',
            body: ''
        })

    }

     const addCommentData = async () => {
            try {
                const comment = postComment(newComment)
                setMyComments([...myComments, comment.data])
                setNewComment({
                    name: '',
                    email: '',
                    body: ''
                })
            } catch (error) {
                console.log("something went wrong", error);
            }
        }
    


    return (
        <>
            <section className='w-full h-full flex justify-center items-center'>
                <form className='md:w-[55vw] md:h-[10vh]  p-3 rounded-xl' onSubmit={handleSubmitButton}>
                    <div className='flex flex-wrap gap-5'>
                        <input type="text"
                            className='form-input p-3 shadow-2xl border-2 border-gray-50 outline-none'
                            placeholder='Add name'
                            name='name'
                            value={newComment.name}
                            onChange={handleInputButton}
                        />
                        <input type="text"
                            className='form-input p-3 shadow-2xl border-2 border-gray-50 outline-none'
                            placeholder='Add email'
                            name='email'
                            value={newComment.email}
                            onChange={handleInputButton}
                        />
                        <input type="text"
                            className='form-input p-3 shadow-2xl border-2 border-gray-50 outline-none'
                            placeholder='Add body'
                            name='body'
                            value={newComment.body}
                            onChange={handleInputButton}
                        />
                        <button
                            className='p-3 bg-green-900 text-white cursor-pointer shadow-2xl border-2 border-gray-50 rounded-xl'
                            value={isEmptyEditComment ? 'Add Comment' : 'Edit Comment'}
                        >
                            {
                                isEmptyEditComment ? 'Add Comment' : 'Edit Comment'
                            }
                        </button>
                    </div>
                </form>
            </section>
        </>
    )
}
export default Form