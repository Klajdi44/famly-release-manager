'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Site extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Country, {
        foreignKey: 'countryId'
      });
      this.belongsTo(models.Subscription, {
        foreignKey: 'subscriptionId'
      });

      // Works
      // this.belongsToMany(models.Segment, {
      //   through: 'SiteSegments',
      //   foreignKey: 'siteId',
      // });

      // Eksperimental
      this.hasMany(models.SiteSegment, {
        foreignKey: 'siteId'
      });
    }
  }
  Site.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Site',
  });
  return Site;
};