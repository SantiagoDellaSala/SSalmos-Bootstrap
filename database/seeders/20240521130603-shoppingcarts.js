'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Shoppingcarts', [
      {
        id: 1,
        amount: 10,
        total: 50000,
        stateId: 1,
        productId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        amount: 13,
        total: 65000,
        stateId: 1,
        productId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        amount: 11,
        total: 55000,
        stateId: 1,
        productId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        amount: 9,
        total: 45000,
        stateId: 1,
        productId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        amount: 15,
        total: 75000,
        stateId: 1,
        productId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    // Puedes implementar la reversión aquí si es necesario
    await queryInterface.bulkDelete('Shoppingcarts', null, {});
  }
};
