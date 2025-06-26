import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ padding: '2rem'}}>
      <h1>Olá, mundo!</h1>
      <p className='my-7'>Contador: {count}</p>
      <button onClick={() => setCount(count + 1)}>Adicionar</button>
    </div>
  )
}

export default App
