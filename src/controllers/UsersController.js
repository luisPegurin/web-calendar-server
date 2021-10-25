const UserModel = require('../models/UserModel');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/env.config.js').jwt_secret
const expiration = require('../config/env.config.js').jwt_expiration_in_seconds

exports.login = (req,res) => {
	
	console.log('teste2')
	let token = jwt.sign({_id: req.body._id, email: req.body.email}, jwtSecret, {
		expiresIn: expiration,
	});
	res.send({accessToken: token});
}

exports.addUser = (req,res) => {
	email = req.body.email;
	password = req.body.password;

	let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt).update(password).digest("base64");
	password = salt + '$' + hash;
	UserModel.insertUser({email: email, password: password})
		.then(result => {
			console.log('teste1')
			req.body._id = result._id;
			exports.login(req,res)
			// res.status(201).send();
		}).catch( (err) => {
			res.status(500).send();
		});
}

