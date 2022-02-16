const mongoose = require('mongoose')
const ProductSchema = new mongoose.Schema({
	product_name:{
		type:String,
		require: true,
		min: 3,
		max: 25,
	},
	main_image:{
		type:String,
		default: "",
		require: true
	},
	other_images:{
		type:Array,
		default: []
	},
	desc:{
		type:String,
		max:500
	},
	price:{
		type:Number,
		require:true
	},
	times_bought:{
		type:Number,
		default:0
	},
	category:{
		type:String,
		default:"others"
	},
	sellerId:{
		type:String,
		require:true
	}
},
{ timestamps:true }
);


module.exports = mongoose.model("Product",ProductSchema)