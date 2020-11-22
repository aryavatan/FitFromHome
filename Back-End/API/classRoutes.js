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

module.exports = router;