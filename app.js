var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var skybitzRouter = require('./routes/skybitz');
var phillipsRouter = require('./routes/phillips');
var starleaseRouter = require('./routes/starlease');
var amzLogisticsRouter = require('./routes/amzLogistics');
var amzRelayRouter = require('./routes/relay');
var amzSpireonRouter = require('./routes/Spireon');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);

app.use('/api/100', skybitzRouter);
app.use('/api/200', starleaseRouter);
app.use('/api/300', phillipsRouter);
app.use('/api/400', amzLogisticsRouter);
app.use('/api/500', amzRelayRouter);
app.use('/api/600', amzSpireonRouter);

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
