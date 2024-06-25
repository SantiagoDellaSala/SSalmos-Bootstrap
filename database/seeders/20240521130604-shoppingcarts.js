'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('shoppingcarts', [
      {
        id: 1,
        total: 50000,
        stateId: 1,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        total: 15000,
        stateId: 2,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        total: 25000,
        stateId: 1,
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('shoppingcarts', null, {});
  }
};