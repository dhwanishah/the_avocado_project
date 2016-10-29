var express = require('express'); // Node web framework
var morgan = require('morgan'); // Route Error and logging
var mongoose = require('mongoose'); // Database schema and exec
var bodyParser = require('body-parser'); // Parse body of request easily
var ejs = require('ejs');
var ejsEngine = require('ejs-mate');


var User = require('./models/user');

var app = new express();

mongoose.connect('mongodb://avocadoRW:gotta<3avocado@localhost:27017/avocado', function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to Database.");
  }
});

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.engine('ejs', ejsEngine);
app.set('view engine', 'ejs');


app.post('/create-user', function(req, res, next) {
  var user = new User({
    email: req.body.email,
    password: req.body.password,
    profile: {
      fullName: req.body.name,
    }
  });
  user.save(function(err) {
    if (err) {
      return next(err);
    }
    res.json(user + "User created successfully.");
  });
});

app.get('/', function(req, res) {
  res.json("{a:1}");
});

app.listen(3000, function(err) {
  if (err) throw err;
  console.log("Application listening on port 3000");
});
