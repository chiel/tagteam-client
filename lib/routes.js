'use strict';

var fs = require('fs'),
	path = require('path'),
	type = require('prime/type'),
	forOwn = require('prime/object/forOwn');

/**
 * This function will apply each module's routes based on the specification
 * found in routes.json. It will also check if the methods that are to bound
 * actually exist.
 * @param {Object} app An object that listens to http verb methods
 */
module.exports = function(app){
	var requiredFiles = [
			'routes.json',
			'controller.js'
		],
		modulesPath = path.normalize(process.cwd() + '/modules'),
		modulePath, f, json, data, controller, fullRoute;

	if (fs.existsSync(modulesPath)){
		var modules = fs.readdirSync(modulesPath);
		modules.forEach(function(moduleName){
			modulePath = modulesPath + '/' + moduleName;
			if (!fs.statSync(modulePath).isDirectory() ||
				/^[_.]/.test(moduleName)) return;

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
				route = route == '/' && moduleName != 'root' ? '' : route;
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
					fullRoute = (moduleName != 'root' ? '/' + moduleName : '') + route;
					app[verb](fullRoute, controller[fn]);
				});
			});
		});
	}
};

