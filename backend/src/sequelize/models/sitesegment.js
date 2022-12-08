'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SiteSegment extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.Site, {
        foreignKey: 'siteId',
        as: 'segments'
      });
      this.belongsTo(models.Segment, {
        foreignKey: 'segmentId',
        as: 'sites'
      });
    }
  }
  SiteSegment.init({
    // test: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SiteSegment',
  });
  return SiteSegment;
};