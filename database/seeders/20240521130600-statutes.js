'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('statutes', [
      {
        id: 1,
        name: 'pendiente',
      },
      {
        id: 2,
        name: 'finalizado',
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('statutes', {
      name: {
        [Sequelize.Op.in]: ['pendiente', 'finalizado']
      }
    }, {});
  }
};
