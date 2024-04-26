'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('guesses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      gameId: {
        field: 'game_id',
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'games',
          key: 'id'
        }
      },
      wordGuess: {
        field: 'word_guess',
        type: Sequelize.STRING,
        allowNull: false
      },
      correctLetterCount: {
        field: 'correct_letter_count',
        type: Sequelize.INTEGER,
        allowNull: false
      },
      correctLetterPositions: {
        field: 'correct_letter_positions',
        type: Sequelize.STRING,
        allowNull: false
      },
      status: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      createdAt: {
        allowNull: false,
        type: 'TIMESTAMP',
        field: 'created_at'
      },
      updatedAt: {
        allowNull: true,
        type: 'TIMESTAMP',
        field: 'updated_at'
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('guesses');
  }
};
