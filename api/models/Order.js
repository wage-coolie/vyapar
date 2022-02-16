const mongoose = require('mongoose')
const OrderSchema = new mongoose.Schema({
	username:{
		type:String,
		require: true,
		min: 3,
		max: 25,
	},
	product_name:{
		type:String,
		require: true,
		max: 25,
	},
	product_id:{
		type:String,
		require: true
	},
	user_id:{
		type:String,
		require: true
	},
	seller_id:{
		type:String,
		require: true
	},
	price:{
		type:Number,
		require:true
	},
	order_delievered:{
		type:Boolean,
		default:true
	},
	phone:{
		type:Number,
		require:true
	},
	address:{
		type:String,
		max:50,
		require:true
	},
	city:{
		type:String,
		max:20,
		require:true
	},
	state:{
		type:String,
		require:true,
		max: 20
	},
	quantity:{
		type:Number,
		require:true,
		default:1
	},
	seller_name:{
		type:String,
		require:true
	}
},
{ timestamps:true }
);


module.exports = mongoose.model("Order",OrderSchema)