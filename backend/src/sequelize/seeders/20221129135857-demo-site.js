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
    return queryInterface.bulkInsert('Sites', [
      {
        name: 'Site #1',
        createdAt: new Date(),
        updatedAt: new Date(),
        countryId: 1,
        subscriptionId: 1,
      },
      {
        name: 'Site #2',
        createdAt: new Date(),
        updatedAt: new Date(),
        countryId: 1,
        subscriptionId: 1,
      },
      {
        name: 'Site #3',
        createdAt: new Date(),
        updatedAt: new Date(),
        countryId: 1,
        subscriptionId: 1,
      },
      {
        name: 'Site #4',
        createdAt: new Date(),
        updatedAt: new Date(),
        countryId: 1,
        subscriptionId: 1,
      },
      {
        name: 'Site #5',
        createdAt: new Date(),
        updatedAt: new Date(),
        countryId: 2,
        subscriptionId: 1,
      },
      {
        name: 'Site #6',
        createdAt: new Date(),
        updatedAt: new Date(),
        countryId: 2,
        subscriptionId: 1,
      },
      {
        name: 'Site #7',
        createdAt: new Date(),
        updatedAt: new Date(),
        countryId: 2,
        subscriptionId: 1,
      },
      {
        name: 'Site #8',
        createdAt: new Date(),
        updatedAt: new Date(),
        countryId: 2,
        subscriptionId: 1,
      },
      {
        name: 'Site #9',
        createdAt: new Date(),
        updatedAt: new Date(),
        countryId: 3,
        subscriptionId: 1,
      },
      {
        name: 'Site #10',
        createdAt: new Date(),
        updatedAt: new Date(),
        countryId: 3,
        subscriptionId: 1,
      },
      {
        name: 'Site #11',
        createdAt: new Date(),
        updatedAt: new Date(),
        countryId: 3,
        subscriptionId: 1,
      },
      {
        name: 'Site #12',
        createdAt: new Date(),
        updatedAt: new Date(),
        countryId: 4,
        subscriptionId: 1,
      },
      {
        name: 'Site #13',
        createdAt: new Date(),
        updatedAt: new Date(),
        countryId: 4,
        subscriptionId: 1,
      },
      {
        name: 'Site #14',
        createdAt: new Date(),
        updatedAt: new Date(),
        countryId: 4,
        subscriptionId: 1,
      },
      {
        name: 'Site #15',
        createdAt: new Date(),
        updatedAt: new Date(),
        countryId: 5,
        subscriptionId: 1,
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
    return queryInterface.bulkDelete('Sites', null, {});
  }
};
