'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('Countries', [
      {
        name: 'Denmark',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'United Kingdom',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'USA',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Germany',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Norway',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Countries', null, {});
  }
};
