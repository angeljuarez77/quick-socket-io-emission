// const express = require('express')
// const app = express()
// const port = 3000
// 
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
// 
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('a user connected socket id: ' + socket.id);
  socket.on("send message", (message) => {
    console.log(`message received from the frontend: ${message}`)
    socket.emit('message received', message);
  });
});


server.listen(3001, () => {
  console.log('listening on *:3000');
});
