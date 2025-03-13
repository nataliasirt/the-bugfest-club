import { useState } from 'react'
import './App.css'
import Hero from './components/custom/Hero'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      { /* HERO */ }
      <Hero/>
    </>
  )
}

export default App
