const express = require('express');

const router = express.Router();

// Firebase
const admin = require('firebase-admin');
const db = admin.firestore();

// GET ALL CLASSES
router.get('/', (req, res) => {
	let classes = [];
	db.collection('classes').get().then((snapshot) =>{
		snapshot.forEach((doc) => {
			console.log(doc.id, '=>', doc.data());
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

module.exports = router;