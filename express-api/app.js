var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testAPIRouter = require('./routes/testAPI');
var cors = require("cors");

var app = express();

const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk');
AWS.config.update({region:'eu-west-2'});

const dynamoDB = new AWS.DynamoDB.DocumentClient;
const tableName = 'TodoListTable';


app.get("/items", (req, res) => {
  var params = {
    TableName: tableName
  };

  dynamoDB.scan(params, (err, data) => {
    if (err) {
      console.log('Error scanning table:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(data.Items);
    }
  });
});

app.use(bodyParser.json());

app.post("/add", (req, res) => {
  const todoID = uuidv4();
  const createdAt = new Date().toISOString();
  const { context } = req.body;

  if (!todoID || !createdAt || !context) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  const params = {
    TableName: tableName,
    Item: {
      todoID: todoID,
      createdAt: new Date().toISOString(),
      context: context
    },
  };

  dynamoDB.put(params, (err) => {
    if (err) {
      console.error('Error putting item:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json({ message: 'Item added successfully' });
    }
  });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/testAPI', testAPIRouter);

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
