'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('roles', [
      {
        id: 1,
        name: 'admin',
      },
      {
        id: 2,
        name: 'user',
      },
      {
        id: 3,
        name: 'invited',
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', {
      name: {
        [Sequelize.Op.in]: ['admin', 'user', 'invited']
      }
    }, {});
  }
};