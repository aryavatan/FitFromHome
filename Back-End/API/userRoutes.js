const express = require('express');
const router = express.Router();

// Firebase
const admin = require('firebase-admin');
const db = admin.firestore();

// Get specific user from DB
// /api/users/:id
router.get('/:id', (req, res) => {
	let id = req.params.id;
	db.collection('users').doc(req.params.id).get().then(user => {
		console.log(user.data());
		res.status(200).json({
			user: user.data()
		});
	}).catch(error => {
		res.status(404).send("User not found");
	});
});

module.exports = router;