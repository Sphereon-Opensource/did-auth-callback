const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const ngrok = require('ngrok');


const indexRouter = require('./routes/index');

const app = express();

let endpoint;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

let allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "content-type");
    next();
};

app.use(allowCrossDomain);
app.use(logger('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Run app server and tunneling service
app.listen(8011, () => {
  ngrok.connect(8011)
      .then(ngrokUrl => {
        endpoint = ngrokUrl;
        console.log(`Callback Service running, open at ${endpoint}`)
      })
});

module.exports = app;
