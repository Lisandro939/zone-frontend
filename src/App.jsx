import './App.css'
import io from 'socket.io-client'
import { useState, useEffect } from 'react'

const socket = io('https://zone-server.zeabur.app/')

function App() {

  const [message, setMessage] = useState("")

  const [messages, setMessages] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    const newMessage = {
      body: message,
      from: "Me"
    }
    setMessages([...messages, newMessage])
    socket.emit('message', message)
  }

  useEffect(() => {
    socket.on('message', receiveMessage)

    return () => {
      socket.off('message', receiveMessage)
    }
  }, [])

  const receiveMessage = message => setMessages(state => [...state, message])

  return (
    <>
      <div className="flex flex-col justify-center items-center bg-gray-300 w-screen h-screen">
        <form onSubmit={handleSubmit} className='flex flex-col'>
          <input 
            type="text"
            placeholder="Escribe un mensaje"
            onChange={(e) => setMessage(e.target.value)}
          />
          <button>Send</button>
        </form>
        <ul>
          {
            messages.map((message, index) => (
              <li key={index}>
                {message.from}: {message.body}
              </li>
            ))
          }
        </ul>
      </div>
    </>
    
  )
}

export default App
