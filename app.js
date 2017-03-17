var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var moment = require('moment');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();
var mongoose=require('mongoose');
var User = require('./models/user').User;

var MongoStore = require('connect-mongo')(session);
var dbUrl = 'mongodb://localhost:27017/heiye';
mongoose.connect(dbUrl);

app.use(session({
    secret: "heiye",
    key: "heiye",
    saveUninitialized: true,
    resave: false,
    store: new MongoStore({
        url: dbUrl,
        //把session保存到mongodb的collection的sessions里
        collection: 'sessions'
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 15
    }, //15 days
}));


//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static("./public"));
app.use("/avatar",express.static("./public/avatar"));
app.locals.moment = require('moment');//在模板中使用时间处理

//session
app.use(function (req, res, next) {
    var username=req.session.username;
    User.findOne({username:username},function(err,user){
        app.locals.user = user;
    });
    app.locals.username = req.session.username;
    next();
});

require('./routes/index')(app);
require('./routes/admin')(app);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('blog/404', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('blog/404', {
    message: err.message,
    error: {}
  });
});

module.exports = app;

