'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Segment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Site, {
        through: 'SiteSegments',
        foreignKey: 'segmentId'
      });

      // Works
      // this.belongsToMany(models.ReleaseToggle, {
      //   through: 'SegmentReleaseToggles',
      //   foreignKey: 'segmentId'
      // });

      // Experimental
      this.hasMany(models.SiteSegment, {
        foreignKey: 'segmentId'
      });
      // this.hasMany(models.SiteSegment, {
      //   foreignKey: 'segmentId',
      // });
    }
  }
  Segment.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Segment',
  });
  return Segment;
};