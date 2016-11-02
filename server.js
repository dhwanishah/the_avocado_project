var express = require('express'); // Node web framework
var morgan = require('morgan'); // Route Error and logging
var mongoose = require('mongoose'); // Database schema and exec
var bodyParser = require('body-parser'); // Parse body of request easily
var ejs = require('ejs'); // Template engine
var ejsEngine = require('ejs-mate'); // Extensions for template engine

// Config
var globalConfig = require('./config/global');

// Models
var User = require('./models/user');

// Express Object and database connections
var app = new express();
var databaseUrl = 'mongodb://' + globalConfig.db1.user + ':' +
                                 globalConfig.db1.pass + '@' +
                                 globalConfig.db1.host + '/' +
                                 globalConfig.db1.name;
mongoose.connect(databaseUrl, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to Database.");
  }
});

// Middleware
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.engine('ejs', ejsEngine);
app.set('view engine', 'ejs');

// Routes
var indexRoutes = require('./routes/index');
var userRoutes = require('./routes/user');
app.use(indexRoutes);
app.use(userRoutes);

// Start connection listening on port
app.listen(globalConfig.port, function(err) {
  if (err) throw err;
  console.log("Application listening on port " + globalConfig.port);
});
