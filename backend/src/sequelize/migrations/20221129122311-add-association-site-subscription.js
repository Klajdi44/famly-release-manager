'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Sites', // name of Source model
      'subscriptionId', // name of the key we're adding
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Subscriptions', // name of Target model
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
      'subscriptionId' // key we want to remove
    );
  }
};
