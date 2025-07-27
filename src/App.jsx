import { useState, useRef } from 'react'
import './App.css'

function formatTimeParts(ms) {
  const centiseconds = Math.floor((ms % 1000) / 10)
  const seconds = Math.floor((ms / 1000) % 60)
  const minutes = Math.floor((ms / 60000) % 60)
  const hours = Math.floor(ms / 3600000)
  return [
    hours.toString().padStart(2, '0'),
    minutes.toString().padStart(2, '0'),
    seconds.toString().padStart(2, '0'),
    centiseconds.toString().padStart(2, '0'),
  ]
}

function App() {
  const [isRunning, setIsRunning] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [laps, setLaps] = useState([])
  const intervalRef = useRef(null)
  const startTimeRef = useRef(null)

  const start = () => {
    if (!isRunning) {
      setIsRunning(true)
      startTimeRef.current = Date.now() - elapsed
      intervalRef.current = setInterval(() => {
        setElapsed(Date.now() - startTimeRef.current)
      }, 10)
    }
  }

  const pause = () => {
    if (isRunning) {
      setIsRunning(false)
      clearInterval(intervalRef.current)
    }
  }

  const reset = () => {
    setIsRunning(false)
    clearInterval(intervalRef.current)
    setElapsed(0)
    setLaps([])
  }

  const lap = () => {
    if (isRunning) {
      setLaps([elapsed, ...laps])
    }
  }

  const [hour, min, sec, centi] = formatTimeParts(elapsed)

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0a0f1a] via-[#232946] to-[#121212] font-sans" style={{fontFamily: 'Inter, sans-serif'}}>
      {/* Logo and subtitle */}
      <div className="w-full flex items-center justify-between px-8 pt-8 mb-8">
        <div className="flex items-center">
          <span className="text-3xl font-extrabold text-pink-300 tracking-tight" style={{fontFamily: 'Inter, sans-serif'}}>Web</span>
          <span className="text-2xl font-medium text-pink-100 ml-1" style={{fontFamily: 'Inter, sans-serif'}}>Watch</span>
        </div>
      </div>
      <div className="flex flex-col items-center w-full flex-1">
        <h2 className="text-2xl md:text-3xl font-semibold text-pink-100 mb-8 mt-2" style={{fontFamily: 'Inter, sans-serif', textShadow: '0 2px 8px #0004'}}>Online Stopwatch</h2>
        {/* Timer */}
        <div className="flex flex-row items-end justify-center w-full mb-2">
          <span className="text-[8vw] md:text-[6vw] lg:text-[5vw] font-extrabold text-white leading-none mx-2" style={{fontFamily: 'Orbitron, monospace'}}>{hour}</span>
          <span className="text-[8vw] md:text-[6vw] lg:text-[5vw] font-extrabold text-white leading-none mx-1" style={{fontFamily: 'Orbitron, monospace'}}>: </span>
          <span className="text-[8vw] md:text-[6vw] lg:text-[5vw] font-extrabold text-white leading-none mx-2" style={{fontFamily: 'Orbitron, monospace'}}>{min}</span>
          <span className="text-[8vw] md:text-[6vw] lg:text-[5vw] font-extrabold text-white leading-none mx-1" style={{fontFamily: 'Orbitron, monospace'}}>: </span>
          <span className="text-[8vw] md:text-[6vw] lg:text-[5vw] font-extrabold text-white leading-none mx-2" style={{fontFamily: 'Orbitron, monospace'}}>{sec}</span>
          <span className="text-[8vw] md:text-[6vw] lg:text-[5vw] font-extrabold text-white leading-none mx-1" style={{fontFamily: 'Orbitron, monospace'}}>: </span>
          <span className="text-[8vw] md:text-[6vw] lg:text-[5vw] font-extrabold text-white leading-none mx-2" style={{fontFamily: 'Orbitron, monospace'}}>{centi}</span>
        </div>
        {/* Controls */}
        <div className="flex flex-row items-center justify-center gap-8 mt-12">
          <button
            onClick={isRunning ? pause : start}
            className={`text-2xl font-bold px-12 py-4 rounded-full focus:outline-none transition-all shadow-lg ${isRunning ? 'bg-blue-400 hover:bg-blue-300 text-white' : 'bg-blue-800 hover:bg-blue-700 text-white'} `}
            style={{fontFamily: 'Inter, sans-serif'}}
          >
            {isRunning ? 'Pause' : (elapsed === 0 ? 'Start' : 'Resume')}
          </button>
          <button
            onClick={reset}
            className="text-2xl font-bold px-12 py-4 rounded-full bg-white/20 hover:bg-white/30 text-white focus:outline-none transition-all shadow-lg"
            style={{fontFamily: 'Inter, sans-serif'}}
          >
            Reset
          </button>
          <button
            onClick={lap}
            disabled={!isRunning}
            className={`text-2xl font-bold px-12 py-4 rounded-full bg-green-500 hover:bg-green-400 text-white focus:outline-none transition-all shadow-lg ${!isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
            style={{fontFamily: 'Inter, sans-serif'}}
          >
            Lap
          </button>
        </div>
        {/* Lap List */}
        <div className="w-full max-w-xl mt-12">
          <h3 className="text-xl font-semibold text-pink-100 mb-4" style={{fontFamily: 'Inter, sans-serif'}}>Laps</h3>
          {laps.length === 0 ? (
            <p className="text-gray-400 text-center">No laps recorded.</p>
          ) : (
            <ol className="w-full space-y-2">
              {laps.map((lapTime, idx) => {
                const [lhour, lmin, lsec, lcenti] = formatTimeParts(lapTime)
                return (
                  <li key={laps.length - idx} className={`flex justify-between items-center px-6 py-3 rounded-lg bg-white/10 text-white font-mono text-lg`}> 
                    <span className="text-pink-200 font-bold">Lap {laps.length - idx}</span>
                    <span className="tracking-widest">{lhour}:{lmin}:{lsec}:{lcenti}</span>
                  </li>
                )
              })}
            </ol>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
