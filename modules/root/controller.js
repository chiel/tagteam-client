'use strict';

var Promise = require('promise'),
	template = require('./../../lib/template'),
	userLib = require('./../users/lib');

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

/**
 *
 */
var signup = {
	body: function(){
		return new Promise(function(resolve){
			template.render('/views/forms/signup.html', {action: '/signup'}).then(
				function(rendered){
					resolve(rendered);
				},
				function(error){
					console.log(error);
					resolve('something wrong rendering');
				}
			);
		});
	}
};

/**
 *
 */
var signupPost = {
	body: function(req){
		return new Promise(function(resolve){
			if (!req.body.email || !req.body.password){
				resolve('Email or password missing');
				return;
			}
			userLib.signup(req.body.email, req.body.password).then(
				function(userData){
					console.log('signup succeeded', userData);
					resolve('signup succeeded');
				}, function(error){
					console.log('failed to register', error);
					resolve('signup failed');
				}
			);
		});
	}
};

module.exports = {
	index: index,
	signup: signup,
	signupPost: signupPost
};

