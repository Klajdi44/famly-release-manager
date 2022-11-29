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
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'Andrei',
        lastName: 'Mihutoni',
        email: 'andrei@example.com',
        password: 'secret123',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Klajdi',
        lastName: 'Ajdini',
        email: 'klajdi@example.com',
        password: 'secret123',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Jonas',
        lastName: 'Bøgh',
        email: 'jonas@example.com',
        password: 'secret123',
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
    return queryInterface.bulkDelete('Users', null, {});
  }
};
