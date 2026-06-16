const FormData = ({title, setTitle, detail, setDetail, note, setNote}) => {

    const submitHandler = (e) => {
        e.preventDefault();
        const notedetail = {
            title: title,
            detail: detail
        }
        if(notedetail.title && notedetail.detail){
            const updatedNotes = [...note, notedetail]
            setNote(updatedNotes)
            localStorage.setItem('notes', JSON.stringify(updatedNotes))
            setTitle('')
            setDetail('')
        }
    }
    return (
        <>
            <form
                onSubmit={(e) => submitHandler(e)}
                className="w-1/2 h-full border-4 border-white">
                <div className="p-10 flex flex-col gap-10">
                    <h1 className="font-bold text-3xl font-serif leading-tight">Add Notes</h1>
                    <div className="flex flex-col gap-5">
                        <input
                            type="text"
                            className="border-2 w-full p-4 text-xl font-serif leading-tight outline-none"
                            placeholder="Add Note Title Name"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <textarea
                            className="border-2 w-full pb-40 p-5 float-start text-xl font-serif leading-tight outline-none"
                            placeholder="Write your notes here"
                            value={detail}
                            onChange={(e) => setDetail(e.target.value)}
                        ></textarea>
                        <button
                            className="border-2 w-full p-4 bg-white text-black text-xl font-serif leading-tight hover:scale-y-90 cursor-pointer outline-none"
                        >Add Task</button>
                    </div>
                </div>
            </form>
        </>
    )
}
export default FormData;