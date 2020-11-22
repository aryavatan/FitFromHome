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
		username: email,
		classId: []
	}).then(() => {
		console.log('New user created: ' + id);
		res.status(200).send('New user created: ' + id);
	}).catch(() => {
		console.log('Failed to create new user');
		res.status(409).send('Failed to create new user');
	})
});

// Add a classId to a user
// api/users/addClass
router.put('/addClass', (req,res) => {
	let uid = req.body.userId;
	let cid = req.body.classId;

	let userRef = db.collection('users').doc(uid);
	userRef.update({
		classId: admin.firestore.FieldValue.arrayUnion(cid)
	}).then(()=> {
		console.log(`Successfully added class ${cid} to user ${uid}`);
		res.status(200).send(`Successfully added class ${cid} to user ${uid}`);
	}).catch(() => {
		console.log(`Error adding class ${cid} to user ${uid}`);
		res.status(500).send(`Error adding class ${cid} to user ${uid}`);
	});
});

module.exports = router;