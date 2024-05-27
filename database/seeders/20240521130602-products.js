'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [
      {
        id: 1,
        name: 'Product 1',
        price: 5000,
        stock: 11,
        mainImage: '1.jpeg',
        secondImage: '2.jpeg',
        thirdImage: '3.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'Product 2',
        price: 5000,
        stock: 17,
        mainImage: '4.jpeg',
        secondImage: '1.jpeg',
        thirdImage: '2.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: 'Product 3',
        price: 5000,
        stock: 17,
        mainImage: '3.jpeg',
        secondImage: '4.jpeg',
        thirdImage: '1.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        name: 'Product 4',
        price: 5000,
        stock: 17,
        mainImage: '2.jpeg',
        secondImage: '3.jpeg',
        thirdImage: '4.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        name: 'Product 5',
        price: 5000,
        stock: 17,
        mainImage: '1.jpeg',
        secondImage: '2.jpeg',
        thirdImage: '3.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  }
};