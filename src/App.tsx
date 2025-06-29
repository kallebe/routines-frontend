import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Routines from './pages/Routines'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Routines />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
