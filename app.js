var mongoose = require("mongoose");
var db = require('./config/keys').mongoURI;
var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 5000;

var todoRouter = require('./routes/todos');

var app = express();

app.use(cors());

mongoose.connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB Successfully"))
  .catch(err => console.log(err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// app.use('/api', todos);

app.listen(PORT, () => {
  console.log("Server is running on Port: " + PORT);
});

app.use('/todos', todoRouter);