const express = require('express');
const router = express.Router();
module.exports = router;

//Firebase
const admin = require('firebase-admin');
const db = admin.firestore();

// GET ALL PROFILES
router.get('/', (req, res) => {
	db.collection('users').get().then(snapshot =>{
        let profiles = [];
		snapshot.forEach((doc) => {
            console.log(doc.id, '=>', doc.data());
            profiles.push(
                {
                    id: doc.id,
                    fullName: doc.data().fullName,
                    category: doc.data.category,
                    bio: doc.data().bio
                }
            )
        });
        
		res.status(200).json({
			fetchedProfiles: profiles,
		});
	});
});

//GET ONE PROFILE
router.get('/:id', async (req, res) => {
	let oneProfile = {};
	console.log(req.params.id);
	const profileRef = db.collection('users').doc(req.params.id);
	const doc = await profileRef.get()
		if (doc.exists) {
			oneProfile = {
                id: doc.id,
                fullName: doc.data().fullName,
				bio: doc.data().bio,
				category: doc.data().category
			}
			console.log(oneProfile)
			res.status(200).json({
				fetchedProfiles: oneProfile
			});
		} else {
			console.log("NOT FOUND");
			res.status(404).status({message: "Profile not found!"});
		}
});

//EDIT PROFILE
router.put('/:id', (req,res) => {
	let id = req.params.id;
	const docRef = db.collection('users').doc(id);
	
	docRef.get().then(doc => {
		if (!doc.exists) {
			console.log('No document ' + id + " exists!");
			res.status(404).json({Message:'No document ' + id + " exists!"});
		}
		else {
			docRef.update({
                fullName: doc.data().fullName,
				bio: doc.data().bio,
				category: doc.data().category
			}).then(() => {
				console.log("Document " + id + " successfully updated");
				res.status(200).send("Document " + id + " successfully updated");
			}).catch(() => {
				res.status(500).send("Internal Server Error");;
			});
		}
	});
});

