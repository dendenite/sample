
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
// Database
var pg = require('pg');
var con = process.env.DATABASE_URL || "pg://dpr:zxcasdqwe@localhost:5432/dendenite-sample-db";

var app = express();

var client = new pg.Client(con);
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

client.connect();
client.query("CREATE TABLE IF NOT EXISTS users(_id bigserial NOT NULL, username character varying(16) NOT NULL, email character varying(30), CONSTRAINT users_pkey PRIMARY KEY (_id))");

app.get('/', routes.index);
app.get('/userlist', user.userlist(client));
app.post('/adduser', user.adduser(client));
app.delete('/deleteuser/:id', user.deleteuser(client));

http.createServer(app).listen(app.get('port'), function () {
	console.log('Express server listening on port ' + app.get('port'));
});