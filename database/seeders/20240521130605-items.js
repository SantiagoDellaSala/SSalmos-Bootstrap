'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('items', [
      {
        quantity: 2,
        price: 5500,
        shoppingcartId: 3,
        productId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        quantity: 1,
        price: 5500,
        shoppingcartId: 1,
        productId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        quantity: 4,
        price: 5500,
        shoppingcartId: 2,
        productId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('items', null, {});
  }
};