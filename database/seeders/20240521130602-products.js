'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [
      {
        id: 1,
        name: 'Product 1',
        price: 5000,
        stock: 11,
        mainImage: '1.png',
        secondImage: '2.png',
        thirdImage: '3.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'Product 2',
        price: 5000,
        stock: 17,
        mainImage: '4.png',
        secondImage: '1.png',
        thirdImage: '2.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: 'Product 3',
        price: 5000,
        stock: 17,
        mainImage: '3.png',
        secondImage: '4.png',
        thirdImage: '1.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        name: 'Product 4',
        price: 5000,
        stock: 17,
        mainImage: '2.png',
        secondImage: '3.png',
        thirdImage: '4.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        name: 'Product 5',
        price: 5000,
        stock: 17,
        mainImage: '1.png',
        secondImage: '2.png',
        thirdImage: '3.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  }
};