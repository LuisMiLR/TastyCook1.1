'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('comments',"recipes_idrecipes" )
    await queryInterface.removeColumn('posts',"users_idusers" )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('posts',"users_idusers"  , {
      
      type: Sequelize.INTEGER
    })
    await queryInterface.addColumn('comments',"recipes_idrecipes"  , {
      
      type: Sequelize.INTEGER
    })
  }
};
