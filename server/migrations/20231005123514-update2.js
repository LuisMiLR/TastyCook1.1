'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('comments',"posts_idposts", {
      type: Sequelize.INTEGER,
      references:{
        model: 'posts',
        key: "id"
      },
      onDelete:'CASCADE'
    })
    await queryInterface.addColumn('posts',"users_idusers"  , {
      
      type: Sequelize.INTEGER,
      references:{
        model: 'users',
        key: "id"
      }
    })
  
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('comments',"posts_idposts") 
    await queryInterface.addColumn('posts',"users_idusers")
    
  }
};
// await  queryInterface createTable 