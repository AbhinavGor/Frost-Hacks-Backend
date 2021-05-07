require('dotenv').config();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
	userName: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	dob: {
		type: Date,
	},
	dateJoined: {
		type: Date,
		default: Date.now()
	},
	authTokens: [{
		token: {
			type: String,
			required: true
		}
		dateGenerated: {
			type: Date,
			default: Date.now()
		}
	}]
});

const User = mongoose.model('User', userSchema);

module.exports = User;


