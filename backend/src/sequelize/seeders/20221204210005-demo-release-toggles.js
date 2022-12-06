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
    return queryInterface.bulkInsert('ReleaseToggles', [
      {
        name: 'Release Toggle #1',
        description: 'Lorem Ipsum Toggle...',
        releaseAt: new Date('1 July 2024 10:00'),
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1,
      },
      {
        name: 'Release Toggle #2',
        description: 'Lorem Ipsum Toggle...',
        releaseAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 2,
      },
      {
        name: 'Release Toggle #3',
        description: 'Lorem Ipsum Toggle...',
        releaseAt: new Date('1 July 2023 08:00'),
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 3,
      },
      {
        name: 'Release Toggle #4',
        description: 'Lorem Ipsum Toggle...',
        releaseAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1,
      },
      {
        name: 'Release Toggle #6',
        description: 'Lorem Ipsum Toggle...',
        releaseAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1,
      },
      {
        name: 'Release Toggle #7',
        description: 'Lorem Ipsum Toggle...',
        releaseAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1,
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
    return queryInterface.bulkDelete('ReleaseToggles', null, {});
  }
};
