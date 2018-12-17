var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose') ;
var session = require('express-session');
var flash = require ('connect-flash');
var config = require('./config/database') ;
var passport = require('passport');

var indexRouter = require('./routes/index');
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');
var dashboardRouter = require('./routes/dashboard');
var conferenceRouter = require('./routes/conference');



// Connect to MongoDB

  mongoose.connect(config.database);

  let db = mongoose.connection ;

  // Check DB connection

   db.once('open', function(){
    console.log("Connected to DB");

   });

  // Check DB errors

  db.on('error', function(err){

      console.log(err);
  });

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: "secret", resave:true, saveUninitialized: true }));
app.use(flash());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// Passport

 require('./config/passport')(passport);

 app.use(passport.initialize());
 app.use(passport.session());


app.get('*', function(req,res,next){

   res.locals.user = req.user || null ;
   next();
});


app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/dashboard', dashboardRouter);
app.use('/conference', conferenceRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
