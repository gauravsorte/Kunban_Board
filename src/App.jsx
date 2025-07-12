import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import KunbanBoard from './components/KunbanBoard'

function App() {
  const [count, setCount] = useState(0)
  console.log("App...");
  
  return (
    <>
     <KunbanBoard />
    </>
  )
}

export default App
