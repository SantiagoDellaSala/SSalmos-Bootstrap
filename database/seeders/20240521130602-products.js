'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [
      {
        id: 1,
        name: 'Petal Grip',
        price: 5500,
        stock: 11,
        talle: "S",
        mainImage: '1.png',
        secondImage: '2.png',
        thirdImage: '3.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'Blossom Ride',
        price: 5500,
        stock: 17,
        talle: "S",
        mainImage: '4.png',
        secondImage: '1.png',
        thirdImage: '2.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: 'Lily Pedal',
        price: 5500,
        stock: 17,
        talle: "S",
        mainImage: '3.png',
        secondImage: '4.png',
        thirdImage: '1.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        name: 'Floral Fit',
        price: 5500,
        stock: 17,
        talle: "S",
        mainImage: '2.png',
        secondImage: '3.png',
        thirdImage: '4.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        name: 'Rose Palm',
        price: 5500,
        stock: 17,
        talle: "S",
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