'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      price: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
      },
      stock: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
      },
      talle: {
        type: Sequelize.STRING,
        allowNull: false
      },
      mainImage: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      secondImage: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      thirdImage: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('products');
  }
};