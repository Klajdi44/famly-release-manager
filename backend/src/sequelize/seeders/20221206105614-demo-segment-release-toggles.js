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
    return queryInterface.bulkInsert('SegmentReleaseToggles', [
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        segmentId: 8,
        releaseToggleId: 2,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        segmentId: 7,
        releaseToggleId: 2,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        segmentId: 7,
        releaseToggleId: 1,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        segmentId: 6,
        releaseToggleId: 4,
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
    return queryInterface.bulkDelete('SegmentReleaseToggles', null, {});
  }
};
