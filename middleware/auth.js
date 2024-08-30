const jwt = require("jsonwebtoken");
const utils = require("../scripts/utils");
require("dotenv").config();
const config = process.env;

const verifyToken = (req, res, next) => {
	let token =
	req.header('authorization') || req.body.token || req.query.token || req.headers["x-access-token"] || req.params.token;
	
	if (!token) {
		return res.status(403).send("A token is required for authentication");
	}
	try {
		token = token.replace(/(Bearer|Basic|\s+)/g,'')	
		const decoded = jwt.verify(token, config.TOKEN_KEY);
		req.token = decoded;
	} catch (err) {
		return res.status(401).send("Invalid Token => " + err);
	}
	
	/**
	 * TODO: implement your auth logic here
	 */
	let phoneNo = req.body.phoneNo || req.params.phoneNo
	if(req.token.phoneNo!=phoneNo){
		return res.status(401).send("ID not match");
	}
	return next();
};

module.exports = verifyToken;