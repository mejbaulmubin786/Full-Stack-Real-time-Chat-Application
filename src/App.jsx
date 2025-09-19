import React, { useEffect, useState } from 'react'
import Auth from './components/Auth'
import Chat from './components/Chat'
import { auth, onAuthStateChanged } from './firebase'


export default function App() {
  const [user, setUser] = useState(null)


  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)
    })
    return () => unsub()
  }, [])


  return (
    <div className="min-h-screen bg-slate-50">
      <header className="p-4 border-b flex justify-between">
        <h1 className="text-2xl">AI Chat</h1>
        <div />
      </header>


      <main className="max-w-3xl mx-auto p-4 h-[80vh]">
        <Auth user={user} setUser={setUser} />
        {user && (
          <div className="mt-4 h-[70vh] border rounded overflow-hidden">
            <Chat user={user} />
          </div>
        )}
      </main>
    </div>
  )
}