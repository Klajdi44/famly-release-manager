'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subscription extends Model {
    static associate(models) {
      // define association here
      this.hasMany(models.Site, {
        foreignKey: 'subscriptionId'
      });
    }
  }
  Subscription.init({
    title: DataTypes.STRING
  }, {
    name: {
      singular: 'subscription',
      plural: 'subscriptions',
    },
    sequelize,
    modelName: 'Subscription',
  });
  return Subscription;
};