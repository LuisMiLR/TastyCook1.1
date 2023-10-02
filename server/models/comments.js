'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Comments.belongsTo(models.Users, { foreignKey: 'users_idusers', as: 'users_comments' });
      models.Comments.belongsTo(models.Posts, { foreignKey: 'posts_idposts', as: 'posts_comments' });
    }
  }
  Comments.init({
    descripcomment: DataTypes.STRING,
    users_idusers: DataTypes.INTEGER,
    recipes_idrecipes: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Comments',
  });
  return Comments;
};