'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      price: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      stock: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      talle: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      mainImage: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      secondImage: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      thirdImage: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  }
};