var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const deposit = require('./routes/api/deposit');
const balance = require('./routes/api/balance');
const withdraw = require('./routes/api/withdraw');
const reward = require('./routes/api/reward');
const product_reward = require('./routes/api/product_reward');
const history = require('./routes/api/history');
const signin = require('./routes/api/signin');

var app = express();
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', deposit);
app.use('/api', balance);
app.use('/api', withdraw);
app.use('/api', reward);
app.use('/api', product_reward);
app.use('/api', history);
app.use('/api', signin);

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
