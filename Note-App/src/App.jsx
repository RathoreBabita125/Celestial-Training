import { useState } from "react"
import FormData from "./Components/FormData"
import NoteData from "./Components/NoteData"
import { SunMoon } from "lucide-react"

function App() {

  const [title, setTitle] = useState('')
  const [detail, setDetail] = useState('')
  const [theme, setTheme] = useState(false)

   const [note, setNote] = useState(()=>{
    const noteData=localStorage.getItem('notes')
    if(!noteData || noteData==='undefined') return []
    return JSON.parse(noteData)  
  })

  const handleThemeBTN=()=>{
    setTheme(!theme)
  }



  return (
    <>
      <div className={ `relative w-full h-[100vh] border-2 m-0 p-0 flex text-white ${theme ? 'bg-black' : 'bg-gray-700'}`}>
        <SunMoon className="absolute top-5 right-5 w-10 h-10 cursor-pointer" onClick={handleThemeBTN} />
        <FormData title={title} setTitle={setTitle} detail={detail} setDetail={setDetail} note={note} setNote={setNote}/>
        <NoteData title={title} setTitle={setTitle} detail={detail} setDetail={setDetail} note={note} setNote={setNote}/>

      </div>
    </>
  )
}

export default App
