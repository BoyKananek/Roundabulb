var express = require('express');
var bodyParse = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');

var app = new express();
var port =  3000 || process.env.PORT;

var pageRouter = require('./app/routers/pageRouter');

var config = require('./config/database.js');

//setting database
mongoose.connect(config.url);

app.use(morgan('dev'));

//allow web page can access control to the api
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'accept, content-type, x-parse-application-id, x-parse-rest-api-key, x-parse-session-token');
  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.send(200);
  }
  else {
    next();
  }
});

//setting template for app
app.set('view engine', 'ejs');

app.use('/',pageRouter);

app.listen(port);
console.log('The magic happens on port ' + port);