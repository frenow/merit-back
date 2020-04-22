var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const saldoRouter = require('./routes/saldo');
const depositoRouter = require('./routes/deposito');
const retiradaRouter = require('./routes/retirada');
const resgateRouter = require('./routes/resgate');
const sobreRouter = require('./routes/sobre');
const deposit = require('./routes/api/deposit');
const balance = require('./routes/api/balance');
const withdraw = require('./routes/api/withdraw');
const reward = require('./routes/api/reward');
const history = require('./routes/api/history');

var app = express();
require('./configs/github.strategy');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Set passport configs
app.use(require('express-session')({ secret: 'shhhh...', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/auth', authRouter);
app.use('/profile', profileRouter);
app.use('/saldo', saldoRouter);
app.use('/deposito', depositoRouter);
app.use('/retirada', retiradaRouter);
app.use('/resgate', resgateRouter);
app.use('/sobre', sobreRouter);
app.use('/api', deposit);
app.use('/api', balance);
app.use('/api', withdraw);
app.use('/api', reward);
app.use('/api', history);

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
