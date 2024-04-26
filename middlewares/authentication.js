const jwt = require('jsonwebtoken');
// const { User } = require('../models');

exports.protect = async (req, res, next) => {
  // TODO: Implement this middleware
  next();
};

exports.googleCallback = async (req, res, next) => {
  // TODO: Implement this middleware
  next();
};

exports.ensureGoogleAuth = async (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/');
  }
};
