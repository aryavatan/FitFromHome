const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");

// Firebase
const admin = require('firebase-admin');
const serviceAccount = require('./path/to/serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const app = express();

// ======================================================================================
// Middleware
app.use(bodyParser.json());
app.use(cors());

// ======================================================================================
// Start Server
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Backend Server listening on port ${port}`));

// GET ALL CLASSES
app.get('/api/classes', (req, res) => {
	
});