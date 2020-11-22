const express = require("express");
const app = express();

const port = 4102;

const http = require("http");
const server = http.Server(app);

const socketIO = require("socket.io");
const io = socketIO(server);
app.use(express.static(__dirname + "/public"));

io.sockets.on("error", e => console.log(e));
server.listen(port, () => console.log(`Server is running on port ${port}`));

let broadcaster

io.sockets.on("connection", socket => {
  // console.log("Connection at " + socket.id)
  socket.on("broadcaster", () => {
    console.log("Broadcaster at " + socket.id)
    broadcaster = socket.id;
    socket.broadcast.emit("broadcaster");
  });
  socket.on("watcher", () =>  {
    // console.log("Watcher at " + socket.id)
    socket.to(broadcaster).emit("watcher", socket.id);
  });
  socket.on("disconnect", () => {
    socket.to(broadcaster).emit("disconnectPeer", socket.id);
  });

  socket.on("offer", (id, message) => {
    // console.log("Sending offer to " + id + " from " + socket.id)
    socket.to(id).emit("offer", socket.id, message);
});
socket.on("answer", (id, message) => {
  // console.log("Sending answer to " + id + " from " + socket.id)
  socket.to(id).emit("answer", socket.id, message);
});
socket.on("candidate", (id, message) => {
  // console.log("Sending ice candidate to " + id + " from " + socket.id)
  socket.to(id).emit("candidate", socket.id, message);
});
socket.on('error', function(err){
  console.log(err)
})
});

