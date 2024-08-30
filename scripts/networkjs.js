const config = require("./config");
const os = require("os");

const gServerIP = config.IP;
const isLive = config.isLiveServer;

function getIPAddress() {
	if(isLive){
		return gServerIP;
	} else {
	  let interfaces = os.networkInterfaces();
	  for (let devName in interfaces) {
		let iface = interfaces[devName];
		for (let i = 0; i < iface.length; i++) {
		  let alias = iface[i];
		  if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal)
			return alias.address;
		}
	  }
	  return '0.0.0.0';
	}	
}

try {
	module.exports = {
		getIPAddress: function () {
			return getIPAddress()
		}
	};
} catch (err) {}