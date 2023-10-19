"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Driver extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Driver.hasMany(models.Trip, { foreignKey: "driverId" });
    }
  }
  Driver.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      contactPhone: DataTypes.STRING,
      contactEmail: DataTypes.STRING,
      licenseNumber: DataTypes.STRING,
      licenseExpiryDate: DataTypes.DATE,
      driverStatus: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Driver",
    }
  );
  return Driver;
};
