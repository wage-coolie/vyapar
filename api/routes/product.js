// Letting the app know this is router
const router = require('express').Router();
const Product = require('../models/Product');


// finding list of 10 product with particular category
router.get("/category", async(req,res) => {
	const category = req.query.category;
	try {
		console.log(category)
		const pa = await Product.find({ category : category }).limit(10);
		res.status(200).json(pa) 
	} catch(e) {
		console.log(e);
		res.status(500).json(e)
	}
})



// // making sure the default url works
// router.get("/", (req,res) => {
// 	res.send({"message": "The product api is working"});
// })

// creating a product
router.post("/", async (req,res) => {
	try {
		const product = await new Product(req.body).save();
		res.status(200).json(product)
	} catch(e) {
		// statements
		console.log(e);
	}

})

// deleating a product
router.delete("/:id", async(req,res) => {
	try {
		const post = await Product.findById(req.params.id)
			await post.deleteOne();
			res.status(200).json("Produt Deleted")
	} catch(e) {
		console.log(e);
		res.status(500).json(e)
	}
})

// deleting a product other_image
router.post("/:id", async (req,res) => {
	try {
		const product = await Product.findById(req.params.id)
		await product.updateOne({$pull:{other_images:req.body.imgtodelete}});
		res.status(200).json("product deleted")
	} catch(e) {
		// statements
		console.log(e);
		res.status(500).json(e);
	}

})



// // getting most 5 recent products
// MySchema.find().sort({ _id: -1 }).limit(10)

router.get("/recent5", async (req,res) => {
	try {
		const products = await Product.find().sort({ createdAt: -1 }).limit(5);
		res.status(200).json(products)
	} catch(e) {
		// statements
		console.log(e);
		res.status(500).json(e);
	}

})

//search products
router.get("/search", async (req,res) => {
	const query = await req.query.querystring;
	console.log(query)
	try {
		const products = await Product.find({product_name:query})
		res.status(200).json(products)
	} catch(e) {
		// statements
		console.log(e);
		res.status(500).json(e);
	}

})



// get all product
router.get("/market", async (req,res) => {
	try {
		const products = await Product.find()
		res.status(200).json(products)
	} catch(e) {
		// statements
		console.log(e);
		res.status(500).json(e);
	}

})

//get a particular product
router.get("/:id", async (req,res) => {
	try {
		const product = await Product.findById(req.params.id)
		res.status(200).json(product)
	} catch(e) {
		// statements
		console.log(e);
		res.status(500).json(e);
	}

})








// getting seller's all product
router.get("/seller/:id", async(req,res) => {
	try {
		const pa = await Product.find({sellerId:req.params.id}).sort({createdAt:-1})
		res.status(200).json(pa) 
	} catch(e) {
		console.log(e);
		res.status(500).json(e)
	}
})








module.exports = router