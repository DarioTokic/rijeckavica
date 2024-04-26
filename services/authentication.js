const { User, sequelize } = require('../models');
const bcrypt = require('bcrypt');
const ApiError = require('../utils/ApiError');

exports.registerUser = async ({ firstName, lastName, email, password }, host) => {
  const transaction = await sequelize.transaction();

  try {
    // check if user exists
    const userExists = await User.findOne({ where: { email }, raw: true });

    if (userExists) {
      throw new ApiError(409, 'User with this email already exists! Try logging in.');
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({ firstName, lastName, email, password: hashedPassword }, { transaction });

    await transaction.commit();

    return user.id;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
