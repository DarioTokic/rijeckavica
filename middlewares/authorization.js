const ApiError = require('../utils/ApiError');

exports.roleCheck = roles => {
  return async (req, res, next) => {
    try {
      if (roles.includes(req.user.role)) {
        next();
      } else {
        next(new ApiError(403, 'You do not have permission to access this route'));
      }
    } catch (error) {
      next(error);
    }
  };
};
