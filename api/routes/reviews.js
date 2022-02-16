const router = require('express').Router();
const User = require('../models/User');
const Review = require('../models/Review');
const Seller = require('../models/Seller');
const Product = require('../models/Product');



// making sure the default url works
// router.get("/", (req,res) => {
// 	res.send({"message": "The review api is working"});
// })


// create a review
router.post("/", async (req,res) => {
	try {

		const review = await new Review({...req.body})
		await review.save();
		res.status(200).json(review)
	} catch(e) {
		// statements
		res.status(500).json(e)
	}

})

// deleting rview
router.delete('/delete/:id', async(req,res) => {
	try{
		const review = await Review.findByIdAndDelete(req.params.id)
		res.status(200).json("Review Deleted")
	}catch(e){
		return res.status(500).json(e)
	}
})

// update the user - Can be used to add the cart too
router.put('/update/:id', async(req,res) => {
		try{
			const review = await Review.findByIdAndUpdate(req.params.id, {
				$set: req.body,
			});
			res.status(200).json(review)
		}catch(e){
			return res.status(500).json(e)
		}
})

// getting all the reviews of a user
router.get("/user/:userId", async(req,res) => {
	try {
		// const user = await User.findOne({username:req.params.username});
		const review = await Review.find({ user_id:req.params.userId }).sort({createdAt:-1});
		res.status(200).json(review)
	} catch(e) {
		console.log(e);
		res.status(500).json(e)
	}
})

// getting all the reviews of a Seller
router.get("/seller/:sellerId", async(req,res) => {
	try {
		// const user = await User.findOne({username:req.params.username});
		const review = await Review.find({ seller_id:req.params.sellerId }).sort({createdAt:-1});
		res.status(200).json(review)
	} catch(e) {
		console.log(e);
		res.status(500).json(e)
	}
})

// getting all the reviews of a Product
router.get("/product/:productId", async(req,res) => {
	try {
		// const user = await User.findOne({username:req.params.username});
		const review = await Review.find({ product_id:req.params.productId }).sort({createdAt:-1});
		res.status(200).json(review)
	} catch(e) {
		console.log(e);
		res.status(500).json(e)
	}
})


module.exports = router;