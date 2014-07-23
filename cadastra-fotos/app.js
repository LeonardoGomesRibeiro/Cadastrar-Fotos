var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var fotos = require('./routes/fotos');
var connection = require('./connection/connection');

connection.connect();

connection.query('DROP TABLE IF EXISTS CADASTRA_FOTOS.FOTOS' , function (err) {
	if(!err) {
		console.log('Tabela dropada!');
	}
});
connection.query('CREATE DATABASE CADASTRA_FOTOS' , function (err) {
	if(!err) {
		console.log('Database criado com sucesso!');		
	}
});
connection.query('CREATE TABLE CADASTRA_FOTOS.FOTOS ( id int, file VARCHAR(500), PRIMARY KEY(id))', function(err, result){
	if(err) {
		console.log(err);
	} else {
		console.log("Tabela criada!");
	}
});

connection.end();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/fotos', fotos);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
