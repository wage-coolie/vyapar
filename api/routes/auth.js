const router = require('express').Router();
const User = require('../models/User');
const Seller = require('../models/Seller');

const bcrypt = require("bcrypt")


 
// logging user 
router.post('/login',async (req,res) => {
	try {
		const user = await User.findOne({email: req.body.email})
		// !user && return res.status(404).json("couldn't find user")
		if (!user){
			res.status(404).json("couldn't find user");
			return;
		}
		const validPassword = await bcrypt.compare(req.body.password,user.password)
		// !validPassword && res.status(404).json("password didn't matched")
		if (!validPassword){
			res.status(404).json("Password didn't matched");
			return;
		}
		res.status(200).json(user)
	} catch(e) {
		// statements
		console.log(e);
		res.status(500).json(e)
	}

})

// logging the seller
router.post('/login/seller',async (req,res) => {
	try {
		const seller = await Seller.findOne({email: req.body.email})
		// !user && return res.status(404).json("couldn't find user")
		if (!seller){
			res.status(404).json("couldn't find the seller's account");
			return;
		}
		const validPassword = await bcrypt.compare(req.body.password,seller.password)
		// !validPassword && res.status(404).json("password didn't matched")
		if (!validPassword){
			res.status(404).json("Password didn't matched");
			return;
		}
		res.status(200).json(seller)
	} catch(e) {
		// statements
		console.log(e);
		res.status(500).json(e)
	}

})

// reauthenticate user after editing details
router.post('/login/after_edit',async (req,res) => {
	try {
		const user = await User.findOne({email: req.body.email})
		// !user && return res.status(404).json("couldn't find user")
		if (!user){
			res.status(404).json("couldn't find user");
			console.log("user was not found")
			return;
		}
		if (user.password !== req.body.password){
			res.status(404).json("Password didn't matched");
			console.log("password was not matched")

			return;
		}
		console.log(user)
		res.status(200).json(user)
	} catch(e) {
		// statements
		console.log(e);
		res.status(500).json(e)
	}

})

// reauthenticate seller after editing details
router.post('/login/seller/after_edit',async (req,res) => {
	try {
		const seller = await Seller.findOne({email: req.body.email})
		// !user && return res.status(404).json("couldn't find user")
		if (!seller){
			res.status(404).json("couldn't find Seller");
			return;
		}
		if (seller.password !== req.body.password){
			res.status(404).json("Password didn't matched");
			return;
		}
		res.status(200).json(seller)
	} catch(e) {
		// statements
		console.log(e);
		res.status(500).json(e)
	}

})


module.exports = router