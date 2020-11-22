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

// Create new user object
// /api/users/
router.post('/', (req, res) => {
	let id = req.body.id;
	let fullName = req.body.name;
	let isTrainer = req.body.isTrainer;
	let email = req.body.email;

	db.collection('users').doc(id).set({
		fullName: fullName,
		isTrainer: isTrainer,
		username: email
	}).then(() => {
		console.log('New user created: ' + id);
		res.status(200).send('New user created: ' + id);
	}).catch(() => {
		console.log('Failed to create new user');
		res.status(409).send('Failed to create new user');
	})
});

module.exports = router;