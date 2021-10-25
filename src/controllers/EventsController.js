// const MongoClient = require("mongodb").MongoClient;
const EventModel = require('../models/EventModel');
const jwt = require('jsonwebtoken');


exports.events = (req,res) => {
	EventModel.getUserEvents(req.jwt._id).then((events) => {
		res.status(200).send(events);
	}).catch((err) => {
		res.status(500).send();
	});
}

exports.addEvent = (req,res) => {
	console.log(req.body);
	req.body.user = req.jwt._id;
	EventModel.insertEvent(req.body)
		.then((result) => {
			delete result.__v;
			console.log('stored event:' + result);
			res.status(201).send(result);
		}).catch( (err) => {
			console.log('Error: '+ err);
			res.status(500).send();
		});
}

exports.deleteEvent = (req,res) => {
	EventModel.removeEvent(req.params.id, req.jwt._id)
		.then( (result) => {
			res.status(204).send();
		}).catch( (err) => {
			console.log(err);
			res.status(500).send();
		})
}
 
exports.updateEvent = (req,res) => {
	
	req.body.user = req.jwt._id;
	console.log(req.body);
	EventModel.updateEvent(req.body)
		.then( (result) => {
			res.status(200).send(result);
		}).catch((err) => {
			res.status(500).send();
		});
}