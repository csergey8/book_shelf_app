const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('./../config/config').get(process.env.NODE_ENV);
const SALT_I = 10;

const userScheema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: 1
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  name: {
    type: String,
    maxlength: 100
  },
  lastname: {
    type: String,
    maxlength: 100
  },
  role: {
    type: Number,
    default: 0
  },
  token: {
    type: String
  }
});


userScheema.pre('save', function(next){
  var user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(SALT_I, (err, salt) => {
      if(err) return next(err);

      bcrypt.hash(user.password, salt, (err, hash) => {
        if(err) return next(err);
        user.password = hash;
        next();
      })
    })
  } else {
    next();
  }
})

userScheema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if(err) return cb(err);
    cb(null, isMatch);
  })
}

userScheema.methods.generateToken = function(cb) {
  var user = this;
  var token = jwt.sign(user._id.toHexString(), config.SECRET);

  user.token = token;
  user.save(function(err, user) {
    if(err) return cb(err);
    cb(null, user);
  });
}

userScheema.statics.findByToken = function(token, cb) {
  const user = this;

  jwt.verify(token, config.SECRET, function(err, decode) {
    user.findOne({"_id": decode, "token": token}, function(err, user) {
      if(err) return cb(err);
      cb(null, user);
    });
  });
}

userScheema.methods.deleteToken = function(token, cb) {
  var user = this;

  user.update({$unset: {token: 1}}, (err, user) => {
    if(err) return cb(err);
    cb(null, user);
  })
}

const User = mongoose.model('User', userScheema);

module.exports = { User };