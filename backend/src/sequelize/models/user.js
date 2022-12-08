'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      this.hasMany(models.ReleaseToggle, {
        foreignKey: 'userId',
      });
      this.hasMany(models.Segment, {
        foreignKey: 'userId',
      });
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    defaultScope: {
      attributes: { exclude: ['password'] }, // Remove password by default when querying
    },
    name: {
      singular: 'user',
      plural: 'users',
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};