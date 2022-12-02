'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Sites', // name of Source model
      'countryId', // name of the key we're adding
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Countries', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'Sites', // name of Source model
      'countryId' // key we want to remove
    );
  }
};