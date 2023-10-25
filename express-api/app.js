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
const tableName = 'ToDoListTable';


app.get("/rows/all", (req, res) => {
  var params = {
    TableName: tableName
  };

  dynamoDB.scan(params, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      var items = [];

      for (var i in data.Items)
        items.push(data.Items[i]['Name']);

      res.contentType = 'application/json';
      res.send(items);
    }
  });
});

app.use(bodyParser.json());

app.post("/rows/add", (req, res) => {
  const todoData = req.body.todo;

  var params = {
    TableName: tableName,
    Item: {
      userID: todoData.userID,
      taskID: Date.now().toString(),
      taskName: todoData.taskName,
      createdAt: new Date().toISOString(),
    },
  };

  dynamoDB.put(params, (err) => {
    if (err) {
      console.error('Error saving to-do list:', err);
      res.status(500).json({ error: 'Failed to save to-do list' });
    } else {
      console.log('To-do list saved successfully');
      res.json({ message: 'To-do list saved successfully' });
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
