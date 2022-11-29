'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'SegmentReleaseToggles', // name of Source model
      'segmentId', // name of the key we're adding
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Segments', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );

    await queryInterface.addColumn(
      'SegmentReleaseToggles', // name of Source model
      'releaseToggleId', // name of the key we're adding
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'ReleaseToggles', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'SegmentReleaseToggles', // name of Source model
      'segmentId' // key we want to remove
    );

    await queryInterface.removeColumn(
      'SegmentReleaseToggles', // name of Source model
      'releaseToggleId' // key we want to remove
    );
  }
};
