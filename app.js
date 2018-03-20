var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var appRoutes = require('./routes/app');
var messagesRoutes = require('./routes/messages');
var usersRoutes = require('./routes/users');
mongoose.connect('mongodb://localhost:27017/node-angular');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json()); //Parses the body to json
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); //Make public folder accessible to Client (js and stylesheets).

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

//next() makes the method 'fall' to here and then we go to app.use('/', appRoutes);



app.use('/message', messagesRoutes);
app.use('/user', usersRoutes);
app.use('/', appRoutes);

// catch 404 and forward to error handler (We 'fell' to here)
app.use(function (req, res, next) {
    return res.render('index');
});


module.exports = app;
