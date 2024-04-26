'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      googleId: {
        field: 'google_id',
        type: Sequelize.STRING
      },
      firstName: {
        field: 'first_name',
        allowNull: false,
        type: Sequelize.STRING
      },
      lastName: {
        field: 'last_name',
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING,
        required: this.googleId ? true : false,
        len: [6, 40]
      },
      role: {
        type: Sequelize.STRING,
        defaultValue: 'user'
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
    await queryInterface.dropTable('users');
  }
};
