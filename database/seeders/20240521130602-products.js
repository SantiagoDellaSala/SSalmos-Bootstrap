'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [
      {
        id: 1,
        name: 'Product 1',
        price: 5000,
        stock: 11,
        mainImage: '/images/1.jpeg',
        secondImage: '/images/2.jpeg',
        thirdImage: '/images/3.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'Product 2',
        price: 5000,
        stock: 17,
        mainImage: '/images/4.jpeg',
        secondImage: '/images/1.jpeg',
        thirdImage: '/images/2.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: 'Product 3',
        price: 5000,
        stock: 17,
        mainImage: '/images/3.jpeg',
        secondImage: '/images/4.jpeg',
        thirdImage: '/images/1.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        name: 'Product 4',
        price: 5000,
        stock: 17,
        mainImage: '/images/2.jpeg',
        secondImage: '/images/3.jpeg',
        thirdImage: '/images/4.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        name: 'Product 5',
        price: 5000,
        stock: 17,
        mainImage: '/images/1.jpeg',
        secondImage: '/images/2.jpeg',
        thirdImage: '/images/3.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  }
};