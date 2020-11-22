const express = require('express');
const router = express.Router();
module.exports = router;

//Firebase
const admin = require('firebase-admin');
const db = admin.firestore();

// GET ALL PROFILES
router.get('/', (req, res) => {
	db.collection('profiles').get().then(snapshot =>{
        let profiles = [];
		snapshot.forEach((doc) => {
            console.log(doc.id, '=>', doc.data());
            profiles.push(
                {
                    id: doc.id,
                    fullName: doc.data().fullName,
                    category: doc.data.category,
                    description: doc.data().description
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
	const profileRef = db.collection('profiles').doc(req.params.id);
	const doc = await profileRef.get()
		if (doc.exists) {
			oneProfile = {
                id: doc.id,
                fullName: doc.data().fullName,
				description: doc.data().description,
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

