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
    return queryInterface.bulkInsert('Segments', [
      {
        title: 'Segment #1',
        description: 'Lorem Ipsum Toggle...',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1,
      },
      {
        title: 'Segment #2',
        description: 'Lorem Ipsum Toggle...',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1,
      },
      {
        title: 'Segment #3',
        description: 'Lorem Ipsum Toggle...',
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
    return queryInterface.bulkDelete('Segments', null, {});
  }
};
