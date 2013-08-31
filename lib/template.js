'use strict';

var fs = require('fs'),
	Promise = require('promise'),
	remnant = require('remnant');

/**
 *
 */
function render(templatePath, data){
	return new Promise(function(resolve, reject){
		if (!templatePath){
			// TODO: should be an ArgumentError
			reject(new Error('No template path provided'));
			return;
		}

		var fullPath = process.cwd() + templatePath;
		fs.exists(fullPath, function(exists){
			if (!exists){
				reject(new Error('Template ' + templatePath + ' does not exist'));
				return;
			}

			fs.readFile(fullPath, function(err, contents){
				if (err){
					console.log(err);
					reject(new Error('Something went wrong while reading template'));
					return;
				}

				data = data || {};
				try {
					resolve(remnant.render(contents.toString('utf8'), data));
				} catch(e){
					console.log(e);
					reject('Something went wrong while rendering the template');
				}
			});
		});
	});
}

module.exports = {
	render: render
};

