const cryptoRandomize = require('crypto-random-string');
try {
	module.exports = {
        random4: () => {
            return cryptoRandomize({length: 4, type: 'numeric'});
        },
        random6: () => {
            return cryptoRandomize({length: 6, type: 'numeric'});
        },
        random: (len=6) => {
            return cryptoRandomize({length: len, type: 'numeric'});
        }
	};
} catch (err) {}