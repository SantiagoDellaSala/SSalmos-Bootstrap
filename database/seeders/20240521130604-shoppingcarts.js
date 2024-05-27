'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Shoppingcarts', [
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
        total: 65000,
        stateId: 1,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        total: 55000,
        stateId: 1,
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        total: 45000,
        stateId: 1,
        userId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        total: 75000,
        stateId: 1,
        userId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Shoppingcarts', null, {});
  }
};