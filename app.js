'use strict';

if (process.cwd() != __dirname){
	process.chdir(__dirname);
}

var express = require('express'),
	app = express();

require('./lib/routes')(app);

app.listen(3001, function(){
	console.log('listening on port 3001');
});

