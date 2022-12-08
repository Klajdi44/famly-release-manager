'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReleaseToggle extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: 'userId',
      });
      this.belongsToMany(models.Segment, {
        through: 'SegmentReleaseToggles',
        foreignKey: 'releaseToggleId',
        as: 'segments',
      })
    }
  }
  ReleaseToggle.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    releaseAt: DataTypes.DATE
  }, {
    name: {
      singular: 'releaseToggle',
      plural: 'releaseToggles',
    },
    sequelize,
    modelName: 'ReleaseToggle',
  });
  return ReleaseToggle;
};