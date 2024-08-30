var PORT = 6969;
var SERVER_IP = "192.168.1.1"
var IS_LIVE_SERVER = !true;

const fs = require('fs')
const localFile = __dirname + '/../.local'

const HOST_ORIGINS = [
	'https://example.domain.com', 'http://example.domain.com',
	'http://example.domain.com/', 'https://example.domain.com/'
]

try {
	IS_LIVE_SERVER = !fs.existsSync(localFile)
} catch(err) {
}

if(!IS_LIVE_SERVER){
	SERVER_VIEWS_URL='http://localhost';
}

try {
	module.exports = {
		ID: SERVER_IP,
		HOST_ORIGINS,
		PORT,
		isLiveServer: IS_LIVE_SERVER,
	};
} catch (err) {}