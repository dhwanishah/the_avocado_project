var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

// Create user schema
var UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: { type: String },
  profile: {
    fullName: { type: String, default: '' },
    profilePic: { type: String, default: '' }
  },
  verified: { type: Boolean, default: false },
  createDate: { type: Date, default: Date.now() },
  modifiedDate: { type: Date, default: Date.now() }
});

// PreSave: capitalize fullName, Hash password
UserSchema.pre('save', function(next) {
  var user = this;

  // Edit the fullname to capitalize for name
  if (user.isModified('profile.fullName')) {
    var fullName = user.profile.fullName;
    var split = fullName.toLowerCase().split(' ');
    user.profile.fullName = split[0].charAt(0).toUpperCase() + split[0].slice(1) + ' ' +
                            split[1].charAt(0).toUpperCase() + split[1].slice(1);
  }

  // Hash the password before storage
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(12, function(err, salt) {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

// Compare and check password if correct
UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
