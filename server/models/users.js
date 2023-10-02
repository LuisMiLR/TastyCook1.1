'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Users.hasMany(models.Posts, { foreignKey: 'users_idusers', as: 'users_posts', onDelete: "cascade" }); 
      models.Users.hasMany(models.Comments, { foreignKey: 'users_idusers', onDelete: "cascade" });
    }
  }
  Users.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    coverPic: DataTypes.STRING,
    profilPic: DataTypes.STRING,
    city: DataTypes.STRING,
    website: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};