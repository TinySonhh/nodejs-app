const logger = require('../middleware/logger')

function encode64(data){
	let buff = new Buffer.from(data);
	let base64data = buff.toString('base64');
	return base64data;
}
function decode64(data){
	let buff = new Buffer.from(data, 'base64');
	let text = buff.toString('ascii');
	return text;
}

function log(message){
	logger.log('info', message)
}

function log_system(message){
	logger.info("[system]: " + message);
}
function log_server(message){
	logger.info("[server]: " + message);
}
function error(message){
	logger.error(message);
}
function warn(message){
	logger.warn(message);
}
function important(text){
	logger.info(text);
}
function i(text){
	logger.info(text);
}

function dump(obj){
	log("[dump]: " + toJson(obj));
}

function toJson (obj){
	try{
		return JSON.stringify(obj);
	} catch(error){		
	}
	return obj;
};

function shortenISODateTimeToDateOnly(isoDateTimeString){
	let dt = isoDateTimeString.replace(/Z/,'');
	let lastIndex = dt.lastIndexOf('T')
	dt = dt.substring(0,lastIndex)

	return `${dt}`;
}

function calculateInterval(pricingCode){
	let interval = [0,'D']
	if(pricingCode!=undefined || pricingCode!=null){
		let amount = pricingCode.charAt(0)
		let unit = pricingCode.charAt(1)
		switch(unit){
			case 'H': unit = 'HOUR'; break;
			case 'D': unit = 'DAY'; break;
			case 'W': unit = 'WEEK'; break;
			case 'M': unit = 'MONTH'; break;
		}
		interval=[amount, unit]
	}

	return interval
}

//try {
	module.exports = {
		encode64: encode64,
		decode64: decode64,
		log: log,
		log_system: log_system,
		log_server: log_server,
		dump: dump,
		error: error,
		warn: warn,
		important: important,
		i: i,
		toJson(obj){
			return toJson(obj)
		}, 
		shortenISODateTimeToDateOnly: shortenISODateTimeToDateOnly,
		calculateInterval: calculateInterval,
	};
//} catch (err) {}