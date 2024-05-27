'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Items', [
      {
        id: 1,
        quantity: 5,
        productId: 1,
        shoppingcartId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        quantity: 6,
        productId: 2,
        shoppingcartId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        quantity: 5,
        productId: 1,
        shoppingcartId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        quantity: 6,
        productId: 2,
        shoppingcartId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        quantity: 5,
        productId: 1,
        shoppingcartId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        quantity: 6,
        productId: 2,
        shoppingcartId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        quantity: 5,
        productId: 1,
        shoppingcartId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        quantity: 6,
        productId: 2,
        shoppingcartId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        quantity: 5,
        productId: 1,
        shoppingcartId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        quantity: 6,
        productId: 2,
        shoppingcartId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Shoppingcarts', null, {});
  }
};