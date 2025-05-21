import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from "./pages/Signup"
import { Signin } from "./pages/Signin"
import { Dashboard } from "./pages/Dashboard"
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Routes>
      <Route path = "/" element = {<Signin/>} />
      <Route path = "/signup" element = {<Signup/>} />
      <Route path = "/dashboard" element = {<Dashboard/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
