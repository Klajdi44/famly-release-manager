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
    return queryInterface.bulkInsert('Subscriptions', [
      {
        title: 'Premium Denmark',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Freemium Denmark',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Premium UK',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Freemium UK',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Premium USA',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Freemium USA',
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
    return queryInterface.bulkDelete('Subscriptions', null, {});
  }
};
