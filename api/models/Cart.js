const mongoose = require('mongoose')
const CartSchema = new mongoose.Schema({
	username:{
		type:String,
		require: true,
		min: 3,
		max: 25,
	},
	product_list:{
		type:Array,
		default:[]
	},
	user_id:{
		type:String,
		require: true,
		unique:true
	}
},
{ timestamps:true }
);


module.exports = mongoose.model("Cart",CartSchema)