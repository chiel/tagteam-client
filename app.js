'use strict';

if (process.cwd() != __dirname){
	process.chdir(__dirname);
}

var express = require('express'),
	config = require('./lib/config')('/config/config.json'),
	app = express();

app
	.use(express.bodyParser())
	.use(express.cookieParser())
	.use(express.session(config.cookie));

require('./lib/routes')(app);

app.listen(3001, function(){
	console.log('listening on port 3001');
});

