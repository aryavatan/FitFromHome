const express = require('express');
const router = express.Router();

// Firebase
const admin = require('firebase-admin');
const db = admin.firestore();

// GET ALL CLASSES
// /api/classes
router.get('/', (req, res) => {
	let classes = [];
	db.collection('classes').get().then((snapshot) =>{
		snapshot.forEach((doc) => {
			//console.log(doc.id, '=>', doc.data());
				classes.push(
					{
						id: doc.id,
						title: doc.data().title,
						createdBy: doc.data().createdBy,
						description: doc.data().description,
						category: doc.data().category,
						price: doc.data().price,
						startDate: doc.data().startDate,
						endDate: doc.data().endDate,
					}
				)
		});
		res.status(200).json({
			fetchedClasses: classes,
		});
	});
});

// get one class
// /api/classes/:id
router.get('/:id', async (req, res) => {
	let oneClass = {};
	console.log(req.params.id);
	const classRef = db.collection('classes').doc(req.params.id);
	const doc = await classRef.get()
	if (doc.exists) {
		oneClass = {
			id: doc.id,
			title: doc.data().title,
			createdBy: doc.data().createdBy,
			description: doc.data().description,
			category: doc.data().category,
			price: doc.data().price,
			startDate: doc.data().startDate,
			endDate: doc.data().endDate,
		}
		console.log(oneClass)
		res.status(200).json({
			fetchedClass: oneClass
		});
	} else {
		console.log("NOT FOUND");
		res.status(404).status({message: "Class not found!"});
	}
});

// Create new class
// /api/classes
router.post('/', (req, res) => {
	db.collection('classes').add({
		title: req.body.title,
		createdBy: req.body.createdBy,
		description: req.body.description,
		category: req.body.category,
		price: req.body.price,
		startDate: req.body.startDate,
		endDate: req.body.endDate
	}).then(doc => {
		console.log('Added a class document with ID: ' + doc.id);
		res.status(200).json({classID: doc.id});
	}).catch(error => {
		console.log(error);
		res.status(500);
	});
});

// Delete Class
// /api/classes/:id
router.delete('/:id', (req,res) => {
	let id = req.params.id;
	db.collection('classes').doc(id).delete().then(() => {
		console.log("Document " + id + " deleted");
		res.status(200).json({Message: "Document " + id + " deleted"});
	}).catch(error => {
		console.log(error);
		res.status(500).json({error: error});
	});
});

// Edit class details
// /api/classes/:id
router.put('/:id', (req,res) => {
	let id = req.params.id;
	const docRef = db.collection('classes').doc(id);
	
	docRef.get().then(doc => {
		if (!doc.exists) {
			console.log('No document ' + id + " exists!");
			res.status(404).json({Message:'No document ' + id + " exists!"});
		}
		else {
			docRef.update({
				title: req.body.title,
				createdBy: req.body.createdBy,
				description: req.body.description,
				category: req.body.category,
				price: req.body.price,
				startDate: req.body.startDate,
				endDate: req.body.endDate
			}).then(() => {
				console.log("Document " + id + " successfully updated");
				res.status(200).send("Document " + id + " successfully updated");
			}).catch(() => {
				res.status(500).send("Internal Server Error");;
			});
		}
	});
});

// Get all classes for specific user
// /api/classes/forUser/:id
router.get('/forUser/:id', async (req, res) => {
	let classIDs = [];
	await db.collection('users').doc(req.params.id).get().then(user => {
		if (!user.exists){
			res.status(404).send("User not found");
		}
		else {
			classIDs = user.data().classId;
			console.log(user.data());
			if (classIDs.length == 0){
				console.log('User has no classes');
				res.status(200).json([]);
			}
		}
	}).catch(error => {
		res.status(404).send("User not found");
	});

	let classes = [];
	for (let i = 0; i < classIDs.length; i++){
		let session = await db.collection('classes').doc(classIDs[i]).get();
		if (session.exists){
			console.log(session.data());
			classes.push(session.data());
		}
	}

	res.status(200).json(classes);
});

// Get all classes created by coach
// api/classes/forCoach/:id
router.get('/forCoach/:id', async (req,res) => {
	let id = req.params.id;
	const snapshot = await db.collection('classes').where('creatorId', '==', id).get();
	if (snapshot.empty){
		console.log('No classes found for coach');
		res.status(404).send('No classes found for coach');
		return;
	}

	let classes = [];
	snapshot.forEach(doc => {
		classes.push({
			id: doc.id,
			title: doc.data().title,
			createdBy: doc.data().createdBy,
			description: doc.data().description,
			category: doc.data().category,
			price: doc.data().price,
			startDate: doc.data().startDate,
			endDate: doc.data().endDate,
			creatorId: doc.data().creatorId
		});
	});

	console.log(classes);
	res.status(200).json(classes);
})

module.exports = router;