// var app = require('express')();
// var http = require('http').createServer(app);
// const PORT = 8080;
// var io = require('socket.io')(http);
// http.listen(PORT, () => {
//     console.log(`listening on *:${PORT}`);
// });

// io.on('connection', (socket) => { /* socket object may be used to send specific messages to the new connected client */
//     console.log('new client connected');
//     socket.emit('connection', null);
// });

import { createServer } from "http";
import { Server } from "socket.io";
const httpServer = createServer();
const io = new Server(httpServer, {  });
