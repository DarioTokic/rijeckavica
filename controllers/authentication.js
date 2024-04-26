const { registerUser, login, googleLogin } = require('../services/authentication');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res, next) => {
  try {
    const user = await registerUser(req.body, req.get('host'));
    res.status(201).json({
      message: 'User registered successfully',
      data: user
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const userData = await login(req.body);
    res.status(200).json({
      message: 'User logged in successfully',
      data: {
        user: userData.user,
        token: userData.token
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.googleLogin = async (req, res, next) => {
  try {
    const userData = await googleLogin(req.user);
    res.status(200).json({
      message: 'User logged in successfully',
      data: userData
    });
  } catch (error) {
    next(error);
  }
};

exports.googleLogout = async (req, res, next) => {
  try {
    req.logout(error => {
      if (error) {
        return next(error);
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.getMe = async (req, res, next) => {
  try {
    // user is already available in req due to the protect middleware
    sendTokenResponse(req.user.dataValues, 200, res);
  } catch (error) {
    next(error);
  }
};
//Sign JWT and return
const getSignedJwtToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};
const sendTokenResponse = (user, statusCode, res) => {
  const token = getSignedJwtToken(user.id);
  res.status(statusCode).json({
    id: user.id,
    firstName: user.firstName,
    googleId: user.googleId || null,
    origin: user.origin,
    lastName: user.lastName || null,
    fullName: user.firstName + ' ' + user.lastName || null,
    email: user.email,
    role: user.role,
    status: user.status,
    token
  });
};
