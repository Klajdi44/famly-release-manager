"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return queryInterface.bulkInsert("Users", [
      {
        firstName: "Andrei",
        lastName: "Mihutoni",
        email: "andrei@example.com",
        password:
          "$2b$10$mxtWyHbkM1V11k5GAsZUDeFJ1Dxe4ihsqh.7tcYIcfeeInNcCmkvy",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Klajdi",
        lastName: "Ajdini",
        email: "klajdi@example.com",
        password:
          "$2b$10$SPPyddDACcCTHru4nUbxTu9oNTOb6A0UrR/K3Wu21sGDAaAgSuAn.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Jonas",
        lastName: "Bøgh",
        email: "jonas@example.com",
        password:
          "$2b$10$lM/hpUT8jQAiBEW.okK/ouYNUcWxUj42oofhQw41WY8VOMRW1cQcy",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Users", null, {});
  },
};
