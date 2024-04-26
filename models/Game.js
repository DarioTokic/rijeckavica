'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    static associate(models) {
      // define association here
    }
  }
  Game.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      userId: {
        field: 'user_id',
        type: DataTypes.INTEGER,
        allowNull: false
      },
      wordId: {
        field: 'word_id',
        type: DataTypes.INTEGER,
        allowNull: false
      },
      status: {
        type: DataTypes.INTEGER,
        defaultValue: 0
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
      tableName: 'games',
      modelName: 'Game'
    }
  );
  return Game;
};
