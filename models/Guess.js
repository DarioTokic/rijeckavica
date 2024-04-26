'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Guess extends Model {
    static associate({ Game }) {
      // define association here
      this.belongsTo(Game, { foreignKey: 'gameId' });
    }
  }
  Guess.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      gameId: {
        field: 'game_id',
        type: DataTypes.INTEGER,
        allowNull: false
      },
      wordGuess: {
        field: 'word_guess',
        type: DataTypes.STRING,
        allowNull: false
      },
      correctLetterCount: {
        field: 'correct_letter_count',
        type: DataTypes.INTEGER,
        allowNull: false
      },
      correctLetterPositions: {
        field: 'correct_letter_positions',
        type: DataTypes.STRING,
        allowNull: false
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
      tableName: 'guesses',
      modelName: 'Guess'
    }
  );
  return Guess;
};
