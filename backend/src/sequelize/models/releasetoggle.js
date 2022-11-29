'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReleaseToggle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: 'userId'
      });
      this.belongsToMany(models.Segment, {
        through: 'SegmentReleaseToggles'
      })
    }
  }
  ReleaseToggle.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    releaseAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'ReleaseToggle',
  });
  return ReleaseToggle;
};