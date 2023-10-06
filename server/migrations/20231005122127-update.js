'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('comments',"users_idusers" )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('comments',"users_idusers"  , {
      
      type: Sequelize.INTEGER
    })
  }
};
