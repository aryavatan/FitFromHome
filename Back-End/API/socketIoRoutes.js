// const express = require('express');

// const http = require('http')
// const server = http.Server(app)
// const io = require("socket.io")(server,{
// 	cors: {
// 		origin: "http://localhost:4200",
// 		credentials: true,
// 	}});
	

// io.sockets.on("error", e => console.log(e));

// let broadcaster

// io.sockets.on("connection", socket => {
//   // console.log("Connection at " + socket.id)
//   socket.on("broadcaster", () => {
//     console.log("Broadcaster at " + socket.id)
//     broadcaster = socket.id;
//     socket.broadcast.emit("broadcaster");
//   });
//   socket.on("watcher", () =>  {
//     // console.log("Watcher at " + socket.id)
//     socket.to(broadcaster).emit("watcher", socket.id);
//   });
//   socket.on("disconnect", () => {
//     socket.to(broadcaster).emit("disconnectPeer", socket.id);
//   });

//   socket.on("offer", (id, message) => {
//     // console.log("Sending offer to " + id + " from " + socket.id)
//     socket.to(id).emit("offer", socket.id, message);
// });
// socket.on("answer", (id, message) => {
//   // console.log("Sending answer to " + id + " from " + socket.id)
//   socket.to(id).emit("answer", socket.id, message);
// });
// socket.on("candidate", (id, message) => {
//   // console.log("Sending ice candidate to " + id + " from " + socket.id)
//   socket.to(id).emit("candidate", socket.id, message);
// });
// socket.on('error', function(err){
//   console.log(err)
// })
// });

