import { Trash2 } from "lucide-react"


const NoteData = ({ note, setNote}) => {

    const deleteHandler = (myNote, idx) => {
        const notedetail = note.filter((currNote, index) => {
            return index != idx
        })
        const updatedNotes = setNote(notedetail)
        localStorage.setItem('notes', JSON.stringify(updatedNotes))
    }


    return (
        <>
            <div className="w-1/2 h-full border-4 border-white p-10 flex flex-col gap-10">
                <h1 className="font-bold text-3xl font-serif leading-tight">My Recent Notes Here</h1>
                <div className="flex flex-wrap gap-7 overflow-hidden overflow-y-scroll">

                    {
                        note.map((myNote, idx) => {
                            
                            return <div key={idx} className="relative w-60 h-75 rounded-xl flex flex-row gap-5 bg-cover bg-center bg-white">
                                <div className="absolute top-4.5 left-0 p-7 text-black w-full h-full flex flex-col gap-2 overflow-y-auto">
                                    <Trash2 className=" absolute top-0 right-1.5 cursor-pointer" onClick={() => deleteHandler(myNote, idx)} />
                                    <h3 className="text-xl wrap-break-word font-bold">{myNote.title}</h3>
                                    <p className="text-xl wrap-break-word leading-tight text-gray-600">{myNote.detail}</p>
                                </div>
                            </div>
                        })
                    }
                </div>

            </div>
        </>
    )
}

export default NoteData