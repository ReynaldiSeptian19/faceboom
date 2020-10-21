'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Content extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Content.belongsTo(models.Group)
    }
  };
  Content.init({
    post: DataTypes.STRING,
    comment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Content',
  });
  return Content;
};