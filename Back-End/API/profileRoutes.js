const express = require('express');
const router = express.Router();
module.exports = router;

const admin = require('firebase-admin');
const db = admin.firestore();