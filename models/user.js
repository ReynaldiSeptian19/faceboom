'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Post)
      User.belongsToMany(models.Group, {
        through: models.UserGroup,
        foreignKey: "UserId"
      })
      User.hasMany(models.UserGroup)
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    profile_pict: DataTypes.STRING
  }, {
    hooks:{
      beforeCreate: (instance, options)=>{
        instance.name += " c'yank c'lalu"
      }
    },
    sequelize,
    modelName: 'User',
  });

  return User;
};