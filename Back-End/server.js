const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");

// Firebase
const admin = require('firebase-admin');
const serviceAccount = require('./service-account.json');
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://fitfromhome-65477.firebaseio.com"
});
const db = admin.firestore();

// API Routes
const ClassRoutes = require('./API/classRoutes.js');
const ProfileRoutes = require('./API/profileRoutes.js')
const UserRoutes = require('./API/userRoutes.js');
// const SocketRoutes = require('./API/socketIoRoutes.js');



// SocketIo
const http = require('http')
const server = http.Server(app)
const io = require("socket.io")(server, {
	cors: {
		origin: "http://localhost:4200",
		methods: ["GET", "POST"],
		credentials: true
	}}
	);

// ======================================================================================
// Middleware
app.use(bodyParser.json());
app.use(cors());

// ======================================================================================
// Use Routes
app.use('/api/classes', ClassRoutes);
app.use('/api/profiles', ProfileRoutes);
app.use('/api/users', UserRoutes);
// ======================================================================================
// Start Server
const port = process.env.PORT || 8080;
server.listen(port, () => console.log(`Backend Server listening on port ${port}`));


io.sockets.on("error", e => console.log(e));

let broadcaster

io.sockets.on("connection", socket => {
  console.log("Connection at " + socket.id)
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

module.exports = app;



