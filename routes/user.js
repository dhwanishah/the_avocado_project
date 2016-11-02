var router = require('express').Router();
var User = require('../models/user');

router.get('/signup', function(req, res) {
  res.json("Signup page");
});

router.post('/signup', function(req, res, next) {
  var user = new User({
    email: req.body.email,
    password: req.body.password,
    profile: {
      fullName: req.body.name
    }
  });

  User.findOne({ email: req.body.email.toLowerCase() }, function(err, existingUser) {
    if (existingUser) {
      console.log(req.body.email + " already exists.");
      res.redirect('/signup');
    } else {
      user.save(function(err) {
        if (err) {
          return next(err);
        }
        res.json("User created successfully.");
      });
    }
  });
});

module.exports = router;
