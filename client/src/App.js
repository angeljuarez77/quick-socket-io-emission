import React, { useState, useEffect } from 'react';
import './App.css';
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

function App() {
  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id);
    });
  }, [])

  function sendMessage() {
    socket.emit('send message', "This is a hardcoded message");
  }

  return (
    <div className="App">
      <button onClick={ () => sendMessage() }>send a hardcoded message</button>
    </div>
  );
}

export default App;
