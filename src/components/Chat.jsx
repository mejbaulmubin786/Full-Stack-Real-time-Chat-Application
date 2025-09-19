import React, { useEffect, useState, useRef } from 'react'


export default function Chat({ user }) {
  const [messages, setMessages] = useState([
    { from: 'assistant', text: 'স্বাগতম! আমি আপনার AI সহকারী — শুরু করতে টাইপ করুন।' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)


  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])


  async function sendMessage(e) {
    e.preventDefault()
    if (!input.trim()) return
    const userMsg = { from: 'user', text: input }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)


    try {
      // POST to your secure server endpoint that holds the API key
      const res = await fetch('/server/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg.text })
      })


      if (!res.ok) throw new Error('Server error')
      const data = await res.json()
      const aiText = data.reply || 'কিছু পাওয়া যায়নি।'
      setMessages(prev => [...prev, { from: 'assistant', text: aiText }])


    } catch (err) {
      setMessages(prev => [...prev, { from: 'assistant', text: 'ত্রুটি: ' + err.message }])
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto p-4 space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={m.from === 'user' ? 'text-right' : 'text-left'}>
            <div className={`inline-block p-3 rounded-lg ${m.from === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
              {m.text}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>


      <form onSubmit={sendMessage} className="p-4 border-t flex gap-2">
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message..." className="flex-1 p-2 border rounded" />
        <button disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">{loading ? '...' : 'Send'}</button>
      </form>
    </div>
  )
}