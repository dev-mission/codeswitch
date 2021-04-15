'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sponsor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  sponsor.init({
    companyName: DataTypes.STRING,
    companyPhone: DataTypes.STRING,
    companyEmail: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'sponsor',
  });
  return sponsor;
};