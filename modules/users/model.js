'use strict';

/**
 *
 */
function User(data){
	this.data = data;
}

/**
 *
 */
User.prototype.getPublicData = function(){
	return {
		id: this.data._id,
		email: this.data.email
	};
};

module.exports = User;

