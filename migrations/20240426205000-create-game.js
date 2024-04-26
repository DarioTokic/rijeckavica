'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('games', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        field: 'user_id',
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      wordId: {
        field: 'word_id',
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'words',
          key: 'id'
        }
      },
      status: {
        type: Sequelize.INTEGER,
        defaultValue: 0
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
    await queryInterface.dropTable('games');
  }
};
