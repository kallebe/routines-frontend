function Routines() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return(
    <div className="flex items-center justify-center min-h-screen text-white w-full">
      <div className="p-8 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4">Routines</h1>
        <p className="text-gray-400">Bem-vindo {user.name}</p>
      </div>
    </div>
  )
}

export default Routines;
