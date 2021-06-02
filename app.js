/*jshint esversion: 6 */

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// import custom router
const productRouter = require('./app/product/router')
const categoryRouter = require('./app/categories/router')
const tagRouter = require('./app/tags/router')
const authRouter = require('./app/auth/router')
const provinsiRouter = require('./app/wilayah/router')

// middleware
const {
  decodeToken
} = require('./app/auth/middleware')


var app = express();

// use custom router
app.use('/api', productRouter);
app.use('/api', categoryRouter);
app.use('/api', tagRouter);
app.use('/api', provinsiRouter);
app.use('/auth', authRouter);

app.use(decodeToken());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;