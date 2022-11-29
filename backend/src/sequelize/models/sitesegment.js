'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SiteSegment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SiteSegment.init({
    test: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SiteSegment',
  });
  return SiteSegment;
};