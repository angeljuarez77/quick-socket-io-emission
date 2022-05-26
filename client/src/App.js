import React, { useState, useEffect } from 'react';
import './App.css';
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

function App() {
  const [messages, setMessages] = useState(['Hardcoded First Message']);
  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id);
    });
  }, [])

  socket.on('message received', (message) => {
    setMessages([...messages, message]);
  })

  const [form, setForm] = useState({ message: '' });
  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    socket.emit('send message', form.message);
  }

  return (
    <div className="App">
      <div className="message-box">
        {
          messages.map(message => {
            return (
              <p className="message">{message}</p>
            )
          })
        }
      </div>
      <form
        onChange={ (e) => handleChange(e) }
        onSubmit={ (e) => handleSubmit(e) }>
        Message Body: <input name="message" />
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}

export default App;
