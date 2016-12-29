var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');
var passport = require('passport');
var flash = require('connect-flash');

var cookieParser = require('cookie-parser');
var session = require('express-session');

var app = new express();
var port =  process.env.PORT || 3000;

var pageRouter = require('./app/routers/pageRouter');

var config = require('./config/database.js');

app.use('/assets', express.static(__dirname + '/public'));

//config data and passport
mongoose.connect(config.url);
require('./config/passport')(passport);

app.use(bodyParser()); // get information from html forms
app.use(cookieParser()); // read cookies (needed for auth)
app.use(morgan('dev'));

app.use(session({secret: config.serect}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

//setting template for app
app.set('view engine', 'ejs');

require('./app/routers/pageRouter.js')(app,passport);

app.listen(port);
console.log('The magic happens on port ' + port);