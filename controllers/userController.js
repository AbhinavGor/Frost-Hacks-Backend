const User = require('../models/User');
const jwt = require('jsonwebtoken');

module.exports = {
	getUsers : async (req, res) => {
		try {
			const allUsers = await User.find({});
			if(allUsers){
				res.status(200).send(allUsers);
			}else{
				throw new Error({ message: "No users found at this moment. Please try again later!", status: "404" });
			}
		} catch (err){
			res.status(500).send(err);
		}
	},
	loginUser : async (req, res) => {
		const { googleId, email, userName, dob } = req.body;
		
		try{
			const foundUser = await User.findOne({ email: email });
			if(foundUser){
				//generate token
				const token = jwt.sign({ _id: foundUser.id.toString(), googleId: foundUser.googleId, isDoc: foundUser.isDoc.toString() });
				const genToken = { token: token, dateGenerated: Date.now() };
				foundUser.tokens.push(genToken);

				await foundUser.save();

				res.status(200).send({ foundUser, genToken });
							
			} else {
				const newUser = new User({ googleId, email, userName, dob });	
				await newUser.save();

				//generate jwt
				res.status(200).send(newUser);
			}
		} catch (err){
			res.status(500).send(err);
		}
	}


}
