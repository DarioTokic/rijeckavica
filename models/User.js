'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Game }) {
      // define association here
      this.hasMany(Game, { foreignKey: 'userId' });
    }

    toJSON() {
      return { ...this.get(), password: undefined };
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        autoIncrement: false
      },
      googleId: {
        field: 'google_id',
        type: DataTypes.STRING
      },
      firstName: {
        field: 'first_name',
        type: DataTypes.STRING,
        required: true
      },
      lastName: {
        field: 'last_name',
        type: DataTypes.STRING
      },
      image: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING,
        required: true,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING,
        required: this.googleId ? true : false,
        len: [6, 40]
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: 'user'
      },
      status: {
        type: DataTypes.INTEGER,
        defaultValue: 1
      },
      createdAt: {
        type: 'TIMESTAMP',
        field: 'created_at',
        allowNull: false
      },
      updatedAt: {
        type: 'TIMESTAMP',
        field: 'updated_at',
        allowNull: true
      }
    },
    {
      sequelize,
      tableName: 'users',
      modelName: 'User'
    }
  );
  return User;
};
