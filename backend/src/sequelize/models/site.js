'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Site extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.Country, {
        foreignKey: 'countryId',
      });
      this.belongsTo(models.Subscription, {
        foreignKey: 'subscriptionId'
      });

      // Works
      this.belongsToMany(models.Segment, {
        through: 'SiteSegments',
        foreignKey: 'siteId',
        as: '_segments'
      });

      // Eksperimental
      this.hasMany(models.SiteSegment, {
        foreignKey: 'siteId',
        as: 'segments'
      });
    }
  }
  Site.init({
    name: DataTypes.STRING
  }, {
    name: {
      singular: 'site',
      plural: 'sites',
    },
    sequelize,
    modelName: 'Site',
  });
  return Site;
};