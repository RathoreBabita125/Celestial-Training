import { useState } from "react"

function App() {

  const [counter, setCounter] = useState(0)

  const handleIncrement = () => {
    setCounter((pre) => pre + 1)
  }

  const handleDecrement = () => {
    if (counter === 0) {
      return
    }
    setCounter((pre) => pre - 1)
  }

  const handleReset = () => {
    setCounter(0)
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-white-100 p-4 sm:p-6">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl bg-cyan-800 flex flex-col gap-6 sm:gap-8 md:gap-10 justify-center items-center rounded-2xl px-6 py-10 sm:px-10 sm:py-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center"> Counter App
        </h1>
        <div className="w-28 h-20 sm:w-32 sm:h-24 md:w-36 md:h-28 bg-white text-cyan-800 font-bold text-4xl sm:text-5xl md:text-6xl flex items-center justify-center rounded-xl">
          {counter}
        </div>
        <div className="w-full flex flex-col justify-center items-center sm:flex-row gap-4 sm:gap-5">
          <button
            className="w-full sm:w-40 md:w-48 py-3 px-4 bg-white text-green-600 text-lg sm:text-xl md:text-2xl font-semibold cursor-pointer rounded-md"
            onClick={handleIncrement}
          >
            Increment
          </button>
          <button
            className="w-full sm:w-40 md:w-48 py-3 px-4 bg-white text-red-600 text-lg sm:text-xl md:text-2xl font-semibold cursor-pointer rounded-md"
            onClick={handleDecrement}
          >
            Decrement
          </button>
          <button
            className="w-full sm:w-40 md:w-48 py-3 px-4 bg-white text-cyan-800 text-lg sm:text-xl md:text-2xl font-semibold cursor-pointer rounded-md "
            onClick={handleReset}
          >Reset</button>
        </div>
      </div>
    </div>
  );
}
export default App
