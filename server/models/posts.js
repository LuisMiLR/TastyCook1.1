'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Posts.belongsTo(models.Users, { foreignKey: 'users_idusers', as: 'posts_users' });
      models.Posts.hasMany(models.Comments, { foreignKey: 'posts_idposts', onDelete: "cascade" });
    }
  }
  Posts.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    cookingtime: DataTypes.STRING,
    img: DataTypes.STRING,
    users_idusers: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Posts',
  });
  return Posts;
};