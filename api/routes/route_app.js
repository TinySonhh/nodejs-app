'use strict';
const auth = require("../../middleware/auth")
const config = require("../../scripts/config");
var cors = require('cors')
module.exports = function(app) {
	let user = require('../controllers/UserController');
	if(config.isLiveServer){
		app.use(cors({
			origin: config.HOST_ORIGINS
		}))
	} else {
		app.use(cors())
	}	
	
	app.route('/user/create')    
		.post(user.create)
		.get(user.create)

	app.use('/user/update-info', auth)
	app.route('/user/update-info')    
		.post(user.updateInfo)
		.get(user.updateInfo)

	app.route('/user/login/:userid')    
		.post(user.login)
		.get(user.login)
	
	app.route('/user/profile/:userid')    
		.post(user.profile)
		.get(user.profile)

};
