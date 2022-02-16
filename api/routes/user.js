const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require("bcrypt")


// making sure the default url works
// router.get("/", (req,res) => {
// 	res.send({"message": "The user api is working"});
// })

// create a user
router.post("/register", async (req,res) => {
	try {
		// generating hashed password\
		console.log(req.body)
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(req.body.password,salt)
		const newuser = await new User({...req.body})
		delete newuser.password
		newuser.password = hashedPassword
		await newuser.save();
		res.status(200).json(newuser)
	} catch(e) {
		// statements
		console.log(e)
		res.status(500).json(e)
	}

})

 
// update the user - Can be used to add the cart too
router.put('/:id', async(req,res) => {
		try{
			const user = await User.findByIdAndUpdate(req.params.id, {
				$set: req.body,
			});
			res.status(200).json(user)
		}catch(e){
			return res.status(500).json(e)
		}
})


// delete user
router.delete('/:id', async(req,res) => {
	try{
		const user = await User.findByIdAndDelete(req.params.id)
		res.status(200).json("Account Deleted")
	}catch(e){
		return res.status(500).json(e)
	}
})


// get a user
router.get("/profile",async (req,res) => {
	const userId = req.query.userId;
	const username = req.query.username;
	try {
		const user = userId ? await User.findById(userId) : await User.findOne({ username : username })
		const {password , updatedAt, ...others} = user._doc
		res.status(200).json(others)
	} catch(e) {
		console.log(e);
		res.status(500).json(e);
	}
})


module.exports = router