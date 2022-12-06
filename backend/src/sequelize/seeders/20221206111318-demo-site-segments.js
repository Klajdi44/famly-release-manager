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
     return queryInterface.bulkInsert('SiteSegments', [
      // Segment # 6
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        segmentId: 6,
        siteId: 1,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        segmentId: 6,
        siteId: 2,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        segmentId: 6,
        siteId: 3,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        segmentId: 6,
        siteId: 4,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        segmentId: 6,
        siteId: 5,
      },
      // Segment # 7
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        segmentId: 7,
        siteId: 6,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        segmentId: 7,
        siteId: 7,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        segmentId: 7,
        siteId: 8,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        segmentId: 7,
        siteId: 9,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        segmentId: 7,
        siteId: 10,
      },
      // Segment # 8
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        segmentId: 8,
        siteId: 11,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        segmentId: 8,
        siteId: 12,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        segmentId: 8,
        siteId: 13,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        segmentId: 8,
        siteId: 14,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        segmentId: 8,
        siteId: 15,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        segmentId: 8,
        siteId: 16,
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
    return queryInterface.bulkDelete('SiteSegments', null, {});
  }
};
