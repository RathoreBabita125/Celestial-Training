import { useContext } from "react"
import { CommentContext } from "../context/comment_context.jsx"
import { deleteComment } from "../api/comment_api.js"

const CommentSection = () => {

    const { myComments, setMyComments, setUpdateComment } = useContext(CommentContext)

    const deleteCommentData = async (Currcomment) => {
        const comment = await deleteComment(Currcomment.id)
        if (comment.status === 200) {
            const updatedComments = myComments.filter((comm) => comm.id !== Currcomment.id)
            setMyComments(updatedComments)
        }
    }

    const handleEditButton = (currComment) => {
        setUpdateComment(currComment)
    }



    return (
        <>
            <section className="flex justify-center items-center px-4 py-10">
                <ol className="list-decimal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl text-white">
                    {myComments.map((currComment) => {
                        return (
                            <li key={currComment.id} className="flex rounded-xl bg-gray-700 shadow-2xl p-4 w-full">
                                <div className="w-full min-h-300px flex flex-col gap-4 p-2">

                                    <p className="font-bold text-lg sm:text-2xl wrap-break-word">{currComment.name}</p>

                                    <p className="text-green-300 font-semibold text-sm sm:text-base wrap-break-word">{currComment.email}</p>

                                    <p className="text-gray-300 text-sm sm:text-[15px] wrap-break-word flex-1">{currComment.body}</p>

                                    <div className="flex flex-col sm:flex-row gap-3 mt-2 justify-center items-center">
                                        <button className="form-button bg-green-700 px-4 py-2 rounded-md w-full sm:w-auto"onClick={() => handleEditButton(currComment)}>Edit</button>
                                        <button className="form-button bg-red-700 px-4 py-2 rounded-md w-full sm:w-auto"onClick={() => deleteCommentData(currComment)}>Delete</button>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ol>
            </section>
        </>
    )
}

export default CommentSection;