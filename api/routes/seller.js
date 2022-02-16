const router = require('express').Router();
const Seller = require('../models/Seller');
const bcrypt = require("bcrypt")
const Product = require('../models/Product');

// making sure the default url works
router.get("/", (req,res) => {
	res.send({"message": "The seller api is working"});
})

// create a seller
router.post("/register", async (req,res) => {
	try {
		// generating hashed password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(req.body.password,salt)
		const newSeller = await new Seller({...req.body})
		delete newSeller.password
		newSeller.password = hashedPassword
		await newSeller.save();
		res.status(200).json(newSeller)
	} catch(e) {
		// statements
		res.status(500).json(e)
	}

})


// update the seller
router.put('/:id', async(req,res) => {
		try{
			const seller = await Seller.findByIdAndUpdate(req.params.id, {
				$set: req.body,
			});
			res.status(200).json(seller)
		}catch(e){
			return res.status(500).json(e)
		}
})


// delete seller
router.delete('/:id', async(req,res) => {
	try{
		const seller = await Seller.findByIdAndDelete(req.params.id)

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
		const seller = userId ? await Seller.findById(userId) : await Seller.findOne({ username : username })
		const {password , updatedAt, ...others} = seller._doc
		res.status(200).json(others)
	} catch(e) {
		console.log(e);
		res.status(500).json(e);
	}
})

// get a seller most recent 3 products
router.get("/mostRecent3",async (req,res) => {
	const userId = req.query.userId;
	// const username = req.query.username;
	try {

		const products = await Product.find({sellerId:userId}).sort({createdAt:-1}).limit(3);
		res.status(200).json(products)
	} catch(e) {
		console.log(e);
		res.status(500).json(e);
	}
})

module.exports = router