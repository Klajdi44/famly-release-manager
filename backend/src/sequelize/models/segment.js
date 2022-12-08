'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Segment extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: 'userId',
      });

      this.belongsToMany(models.Site, {
        through: 'SiteSegments',
        foreignKey: 'segmentId',
        as: '_sites'
      });

      // Works
      this.belongsToMany(models.ReleaseToggle, {
        through: 'SegmentReleaseToggles',
        foreignKey: 'segmentId',
        as: 'releases',
      });

      // Works
      this.hasMany(models.SiteSegment, {
        foreignKey: 'segmentId',
        as: 'sites'
      });
    }
  }
  Segment.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    name: {
      singular: 'segment',
      plural: 'segments',
    },
    sequelize,
    modelName: 'Segment',
  });
  return Segment;
};