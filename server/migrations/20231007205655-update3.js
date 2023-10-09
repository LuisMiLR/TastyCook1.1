"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("posts", "description", {
      type: Sequelize.STRING(2000),
      allowNull: false,
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("posts", "description");
  },

};
