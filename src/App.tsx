import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Routines from './pages/Routines'
import NewUser from './pages/NewUser'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Routines />} />
        <Route path="/login" element={<Login />} />
        <Route path="/new-user" element={<NewUser />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
