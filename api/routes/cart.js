const router = require('express').Router();
const Cart = require('../models/Cart');

// // get default cart route
// router.get("/", async (req,res) => {
// 	res.json("Cart api is fine")
// })

// creating a cart
router.post("/create", async (req,res) => {
	try {
		const newCart = await new Cart({...req.body})
		console.log(newCart)
		await newCart.save();
		res.status(200).json(newCart)
	} catch(e) {
		// statements
		console.log(e)
		res.status(500).json(e)
	}

})

// get a cart
router.get("/:id", async (req,res) => {
	try {
		const cart = await Cart.findById(req.params.id)
		res.status(200).json(cart)
	} catch(e) {
		// statements
		res.status(500).json(e)
	}

})



// adding a product to cart - Or removing it 
router.put("/add", async (req,res) => {
	try {
		const cart = await Cart.findById(req.body.cart_id)

		if (!cart.product_list.includes(req.body.product_id)){
			await cart.updateOne({$push:{product_list:req.body.product_id}});
			res.status(200).json("Added in cart")
			return;
		}else{
			await cart.updateOne({$pull:{product_list:req.body.product_id}});
			res.status(200).json("Removed from cart")
		}
	} catch(e) {
		// statements
		res.status(500).json(e)
	}

})

// delete the cart
router.delete("/:id", async (req,res) => {
	try {
		const cart = await Cart.findByIdAndDelete(req.params.id)
		res.status(200).json("cart deleted")
	} catch(e) {
		// statements
		res.status(500).json(e)
	}

})

module.exports = router