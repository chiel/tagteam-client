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

/**
 *
 */
var login = {
	body: function(){
		return new Promise(function(resolve){
			template.render('/views/forms/login.html', {action: '/login'}).then(
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
var loginPost = {
	body: function(req){
		return new Promise(function(resolve){
			if (!req.body.email || !req.body.password){
				resolve('Email or password missing');
				return;
			}
			userLib.login(req.body.email, req.body.password).then(
				function(user){
					req.session.user = user.getPublicData();
					resolve('login succeesed');
				},
				function(error){
					console.log('failed to login', error);
					resolve('login failed');
				}
			);
		});
	}
};

module.exports = {
	index: index,
	signup: signup,
	signupPost: signupPost,
	login: login,
	loginPost: loginPost
};

