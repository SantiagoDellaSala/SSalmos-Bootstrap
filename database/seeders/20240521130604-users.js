'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        id: 1,
        name: 'Silvia',
        lastName: 'Ponce',
        userName: 'silviaponce2024',
        email: 'silviciclismo@gmail.com',
        password: 'Figaro2020', 
        troleyId: 1,
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'Emiliano',
        lastName: 'Della Sala',
        userName: 'janedoe',
        email: 'emiliano@gmail.com',
        password: 'Figaro2021',
        troleyId: 2,
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: 'Santiago',
        lastName: 'Della Sala',
        userName: 'santiagodellasala2024',
        email: 'dellasala1992@gmail.com',
        password: 'Figaro2022',
        troleyId: 3,
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        name: 'Leandro',
        lastName: 'Manelli',
        userName: 'leandromanelli2024',
        email: 'leandromanelli@gmail.com',
        password: 'leandro1234',
        troleyId: 4,
        roleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        name: 'Luciano',
        lastName: 'Cormenzana',
        userName: 'lucianocormenzana2024',
        email: 'lucianocormenzana@gmail.com',
        password: 'luciano1234',
        troleyId: 5,
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