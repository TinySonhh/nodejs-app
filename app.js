const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const config = require("./scripts/config");

let server_all = null
const fs = require('fs');
if(config.isLiveServer){
	const https = require('https');

	const https_options = {
		ca: fs.readFileSync("ssl/ca_bundle.crt"),
		key: fs.readFileSync("ssl/private.key"),
		cert: fs.readFileSync("ssl/certificate.crt")
	};
	server_all = https.createServer(https_options, app)
}else {
	server_all = require('http').Server(app);
}

require("dotenv").config();

const utils = require('./scripts/utils');
const network_js = require('./scripts/networkjs');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

let route_app = require('./api/routes/route_app') //importing route

route_app(app)

var port = (process.env.PORT || config.PORT());
server_all.listen(port, () => {
	utils.log_server (`Your App Server is running in server:port ${network_js.getIPAddress()}:${port}`);
});