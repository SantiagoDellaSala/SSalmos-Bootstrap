'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        id: 1,
        name: 'Silvia',
        lastname: 'Ponce',
        username: 'silviaponce2024',
        email: 'silviciclismo@gmail.com',
        password: '$2a$10$Pfux.BTrIo/RX5zCq1L8Z.KJFyZMsfNDd6TDXjCwQ0tq/a7xZLvl.', 
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'Emiliano',
        lastname: 'Della Sala',
        username: 'janedoe',
        email: 'emiliano@gmail.com',
        password: '$2a$10$Pfux.BTrIo/RX5zCq1L8Z.KJFyZMsfNDd6TDXjCwQ0tq/a7xZLvl.',
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: 'Santiago',
        lastname: 'Della Sala',
        username: 'santiagodellasala2024',
        email: 'dellasala1992@gmail.com',
        password: '$2a$10$Pfux.BTrIo/RX5zCq1L8Z.KJFyZMsfNDd6TDXjCwQ0tq/a7xZLvl.',
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        name: 'Leandro',
        lastname: 'Manelli',
        username: 'leandromanelli2024',
        email: 'leandromanelli@gmail.com',
        password: '$2a$10$Pfux.BTrIo/RX5zCq1L8Z.KJFyZMsfNDd6TDXjCwQ0tq/a7xZLvl.',
        roleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        name: 'Luciano',
        lastname: 'Cormenzana',
        username: 'lucianocormenzana2024',
        email: 'lucianocormenzana@gmail.com',
        password: '$2a$10$Pfux.BTrIo/RX5zCq1L8Z.KJFyZMsfNDd6TDXjCwQ0tq/a7xZLvl.',
        roleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};