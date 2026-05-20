import { useState } from "react"


function App() {

  const[counter, setCounter]=useState(0)

  const handleIncrement=()=>{
    setCounter((pre)=>pre+1)
  }

  const handleDecrement=()=>{
    if(counter===0){
      return
    }
    setCounter((pre)=>pre-1)
  }

  const handleReset=()=>{
    setCounter(0)
  }
 
  return (
   <>
   <div className="w-full h-screen flex justify-center items-center ">
    <div className="w-[60vw] h-[80vh] bg-cyan-800 flex flex-col gap-10 justify-center items-center rounded-2xl">
      <h1 className="text-6xl font-bold text-white text-center">Counter App</h1>
      <h4 className="w-[15vw] h-[10vh] bg-white text-cyan-800 font-bold text-6xl text-center p-5 rounded-xl items-center">{counter}</h4>

      <div className="flex gap-5">
        <button className="md:w-[12vw] wrap-break-word p-3 bg-white text-green-600 text-2xl font-semibold cursor-pointer rounded-[5px]" onClick={handleIncrement}>Increment</button>
        <button className="md:w-[12vw] wrap-break-word p-3 bg-white text-red-600 text-2xl font-semibold cursor-pointer rounded-[5px]" onClick={handleDecrement}>Decrement</button>
      </div>

      <button className="md:w-[12vw] wrap-break-word p-3 bg-white text-cyan-800 text-2xl font-semibold cursor-pointer rounded-[5px]" onClick={handleReset}>Reset</button>
      

    </div>
   </div>
   </>
  )
}

export default App
