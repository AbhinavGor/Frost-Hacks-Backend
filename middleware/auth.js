const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
	const token = req.header("Authorization").replace("Bearer ", "");

	const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
	const { googleId } = decodedToken;
	
	const authUser = await User.findOne({ googleId: googleId, tokens.token[-1]: token });

	if(!authUser){
		res.status(404).send({"message": `User with googleId ${decodedToken.googleId} not found` });
	}else{
		res.token = token;
		res.user = authUser;
		next();
	}
}

module.exports = { auth };
