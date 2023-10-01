var createError = require('http-errors');
var express = require('express');
var path = require('path');
var jwt=require("./routes/jwt")
var cors = require('cors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var statecityRouter = require('./routes/statecity');
var companyRouter = require('./routes/company');
var categoryRouter = require('./routes/category');
var productRouter = require('./routes/product');
var productlistRouter = require('./routes/productlist');
var bannerRouter = require('./routes/banner');
var userinterfaceRouter = require('./routes/userinterface');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/userinterface',userinterfaceRouter);
app.use(jwt())

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/statecity', statecityRouter);
app.use('/company', companyRouter);
app.use('/category', categoryRouter);
app.use('/product', productRouter);
app.use('/productlist', productlistRouter);
app.use('/banner',bannerRouter);

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
