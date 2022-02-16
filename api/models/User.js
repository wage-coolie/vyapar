const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
	username:{
		type:String,
		require: true,
		min: 3,
		max: 25,
	},
	email:{
		type:String,
		require: true,
		max: 40,
		unique: true
	},
	password:{
		type:String,
		require: true,
		min: 5,
		max: 25
	},
	profileImage:{
		type:String,
		default: ""
	},
	userBought:{
		type:Array,
		default: []
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
	phoneNumber:{
		type:Number,
		require:true
	},
	cart_id:{
		type:String,
		default: ""
	}

},
{ timestamps:true }
);


module.exports = mongoose.model("User",UserSchema)