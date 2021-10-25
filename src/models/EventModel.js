const mongoose = require('../services/MongooseService').mongoose;
const Schema = mongoose.Schema;


const eventSchema = new Schema({
	title: String,
	day: Number,
	month: Number,
	year: Number,
	startTime: String,
	endTime: String,
	user: String
});

const Event = mongoose.model('Event', eventSchema);


exports.insertEvent = (data) => {
	const event = new Event(data);
	return event.save();
}

exports.getUserEvents = (userId) => {
	return Event.find({user: userId},{"_id":1,"__v":0});
}

exports.removeEvent = (eventId, userId) => {
	return new Promise( (resolve,reject) => {
		Event.deleteOne({_id : eventId, user:userId}, (err) => {
			if (err) {
				reject(err);
			} else {
				resolve();
			}
		});
	})
}

exports.updateEvent = (event) => {
	return new Promise( (resolve,reject) => {
		Event.updateOne({_id: event._id, user: event.user}, event, function (err, res) {
			if (err) {
				reject(err);
			}else {
				resolve(res);
			}
		})
	})
}

