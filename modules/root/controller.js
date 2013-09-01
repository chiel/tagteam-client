'use strict';

var Promise = require('promise'),
	template = require('./../../lib/template'),
	userLib = require('./../users/lib');

/**
 *
 */
function index(req){
	return {
		header: '/views/header.html',
		footer: '/views/footer.html',
		body: new Promise(function(resolve){
			var view, data;
			if (!req.session.user){
				view = '/views/forms/login.html';
				data = {action: '/login'};
			} else {
				view = '/views/home.html';
				data = {};
			}

			template.render(view, data).then(
				function(rendered){
					resolve(rendered);
				},
				function(error){
					console.log(error);
					resolve('something wrong rendering');
				}
			);
		})
	};
}

/**
 *
 */
function signup(){
	return {
		body: new Promise(function(resolve){
			template.render('/views/forms/signup.html', {action: '/signup'}).then(
				function(rendered){
					resolve(rendered);
				},
				function(error){
					console.log(error);
					resolve('something wrong rendering');
				}
			);
		})
	};
}

/**
 *
 */
function signupPost(req){
	return {
		body: new Promise(function(resolve){
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
		})
	};
}

/**
 *
 */
function login(){
	return {
		body: new Promise(function(resolve){
			template.render('/views/forms/login.html', {action: '/login'}).then(
				function(rendered){
					resolve(rendered);
				},
				function(error){
					console.log(error);
					resolve('something wrong rendering');
				}
			);
		})
	};
}

/**
 *
 */
function loginPost(req, res){
	return {
		body: new Promise(function(resolve){
			if (!req.body.email || !req.body.password){
				resolve('Email or password missing');
				return;
			}
			userLib.login(req.body.email, req.body.password).then(
				function(user){
					req.session.user = user.getPublicData();
					res.redirect('/');
				},
				function(error){
					console.log('failed to login', error);
					resolve('login failed');
				}
			);
		})
	};
}

module.exports = {
	index: index,
	signup: signup,
	signupPost: signupPost,
	login: login,
	loginPost: loginPost
};

