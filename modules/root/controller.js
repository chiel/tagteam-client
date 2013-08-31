'use strict';

var Promise = require('promise');

/**
 *
 */
var index = {
	body: function(){
		return new Promise(function(resolve){
			resolve('index');
		});
	}
};

module.exports = {
	index: index
};

