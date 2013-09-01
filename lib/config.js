'use strict';

var fs = require('fs'),
	cache = {};

module.exports = function(path){
	if (cache[path]){
		return cache[path];
	}

	var configPath = process.cwd() + path;
	if (!fs.existsSync(configPath)){
		console.log('Cannot find config file ' + path + ', exiting...');
		process.exit();
	}

	var json = fs.readFileSync(configPath).toString('utf8');
	try {
		cache[path] = JSON.parse(json);
		return cache[path];
	} catch(e) {
		return;
	}
};

