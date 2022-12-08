'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SegmentReleaseToggle extends Model {
    static associate(models) {
      // define association here
    }
  }
  SegmentReleaseToggle.init({
    // test: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SegmentReleaseToggle',
  });
  return SegmentReleaseToggle;
};