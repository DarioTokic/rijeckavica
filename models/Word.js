'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Word extends Model {
    static associate({ Game }) {
      // define association here
      this.hasMany(Game, { foreignKey: 'wordId' });
    }
  }
  Word.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      word: {
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
      tableName: 'words',
      modelName: 'Word'
    }
  );
  return Word;
};
