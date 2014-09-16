var winston = require('winston');
require('winston-logentries');

var logger = new winston.Logger({
	transports: [
	        new winston.transports.Console({
	        	json: true
	        }),
	        new winston.transports.Logentries({
	        	token: process.env.LOG_TOKEN,
	        	json: true
	        })
	]
});

module.exports = logger;

