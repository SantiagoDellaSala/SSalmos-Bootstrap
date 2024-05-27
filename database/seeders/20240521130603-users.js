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
        password: 'Figaro2020', 
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
        password: 'Figaro2021',
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
        password: 'Figaro2022',
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
        password: 'leandro1234',
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
        password: 'luciano1234',
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