'use strict';

var fs = require('fs'),
	path = require('path'),
	type = require('prime/type'),
	forOwn = require('prime/object/forOwn');

module.exports = function(app){
	var requiredFiles = [
			'routes.json',
			'controller.js'
		],
		modulesPath = path.normalize(process.cwd() + '/modules'),
		modulePath, f, json, data, controller;

	if (fs.existsSync(modulesPath)){
		var modules = fs.readdirSync(modulesPath);
		modules.forEach(function(moduleName){
			modulePath = modulesPath + '/' + moduleName;
			if (/^[_.]/.test(moduleName)) return;

			for (f = 0; f < requiredFiles.length; f++){
				if (!fs.existsSync(modulePath + '/' + requiredFiles[f])){
					console.log('Required file ' + requiredFiles[f] + ' missing for module ' + moduleName);
					return;
				}
			}

			json = fs.readFileSync(modulePath + '/routes.json');
			try {
				data = JSON.parse(json);
			} catch(e){
				console.log('Failed to parse json for module ' + moduleName + ': ' + e.message);
				return;
			}

			controller = require(modulePath + '/controller');

			forOwn(data, function(verbs, route){
				route = route == '/' ? '' : route;
				if (type(verbs) == 'string'){
					verbs = { get: verbs };
				}
				forOwn(verbs, function(fn, verb){
					if (!controller[fn]){
						console.log('Function ' + fn + ' not found in ' + moduleName + ' controller');
						return;
					}
					if (!/^(?:get|post|put|delete|head|patch|options)$/.test(verb)){
						console.log('Invalid HTTP verb "' + verb + '" for route ' + route);
						return;
					}
					app[verb]('/' + moduleName + route, controller[fn]);
				});
			});
		});
	}
};

