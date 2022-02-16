const router = require('express').Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const Seller = require('../models/Seller');
const User = require('../models/User');


// // making sure the default url works
// router.get("/", (req,res) => {
// 	res.send({"message": "The order api is working"});
// })


// create an order
router.post("/", async (req,res) => {
	// creating a new order
	try {
		const newOrder = await new Order({...req.body})
		await newOrder.save();
		// res.status(200).json("Order done")
	} catch(e) {
		// statements
		console.log('failed to create order')
		res.status(500).json(e);
		return;
	}
	// updating user_bought
	try {
		const user = await User.findByIdAndUpdate(req.body.user_id,  { $push: {userBought: req.body.product_id } });
		// res.status(200).json("")
	} catch(e) {
		// statements
		console.log('failed to update user');
		res.status(500).json(e);
		return;
	}
	// updating product times_bought 
	try {
		const product = await Product.findByIdAndUpdate(req.body.product_id,  { $inc: {times_bought: 1*req.body.quantity } });
		// res.status(200).json("")
	} catch(e) {
		// statements
		console.log('failed to update times_bought')		
		res.status(500).json(e);
		return;
	}
	// seller sold updation
	try {
		const product = await Seller.findByIdAndUpdate(req.body.seller_id,  { $inc: {totalItemsSold: 1 } });
		res.status(200).json("Everything Updating succesfully")
	} catch(e) {
		// statements
		console.log('failed to update seller sold')		
		res.status(500).json(e);
		return;
	}

})

// get the order info
router.post("/:id", async (req,res) => {
	const orderId = req.params.id
	try {
		const order = await Order.findById(orderId)
		res.status(200).json(order)
	} catch(e) {
		// statements
		res.status(500).json(e)
	}

})


// delete the order
router.delete("/:id", async (req,res) => {
	const orderId = req.params.id
	try {
		const order = await Order.findByIdAndDelete(orderId)
		res.status(200).json("order Deleted")
	} catch(e) {
		// statements
		res.status(500).json(e)
	}

})


// getting all the orders of a seller
router.get("/", async(req,res) => {
	const sellerId = req.query.sellerId;
	try {
		const pa = await Order.find({ seller_id : sellerId }).sort({createdAt:-1})
		res.status(200).json(pa) 
	} catch(e) {
		console.log(e);
		res.status(500).json(e)
	}
})

// getting all the orders of a user
router.get("/user/:id", async(req,res) => {
	const userId = req.params.id;
	try {
		const pa = await Order.find({ user_id : userId }).sort({createdAt:-1});
		res.status(200).json(pa) 
	} catch(e) {
		console.log(e);
		res.status(500).json(e)
	}
})

module.exports = router