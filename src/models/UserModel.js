const mongoose = require('../services/MongooseService').mongoose;
const Schema = mongoose.Schema;


const userSchema = new Schema({
	email: {type: String, unique: true, required : true },	
	password: {type: String, required : true }
});

const User = mongoose.model('User', userSchema);

exports.insertUser = (data) => {
	const user = new User(data);
	return user.save();
}

exports.findByEmail = (email) => {
	return User.findOne({email: email});
}

