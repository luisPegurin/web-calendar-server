const UserModel = require('../models/UserModel');
const crypto = require('crypto');
const jwtSecret = require('../config/env.config.js').jwt_secret
const jwt = require('jsonwebtoken');

exports.isEmailAndPasswordMatch = (req,res,next) => {
    email = req.body.email;
	password = req.body.password;

	UserModel.findByEmail(email)
		.then((user) => {
			if(user){
            	let passwordFields = user.password.split('$');
                let salt = passwordFields[0];
                let hash = crypto.createHmac('sha512', salt).update( password).digest("base64");
                if (hash === passwordFields[1]) {
                	req.body = user;
                	next();
                }
            }
            res.status(400).send({error: "Usuário e senha inválidos"} )
		}).catch( (err) => {
            res.status(500).send();
        })
}  

exports.validJWTNeeded = (req, res, next) => {
    if (req.headers['authorization']) {
        try {
            let authorization = req.headers['authorization'].split(' ');
            if (authorization[0] !== 'Bearer') {
                return res.status(401).send();
            } else {
                req.jwt = jwt.verify(authorization[1], jwtSecret);
                console.log('jwt',req.jwt);
                return next();
            }
        } catch (err) {
            return res.status(403).send({error: err.toString()});
        }
    } else {
        return res.status(401).send();
    }
};


