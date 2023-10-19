"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class FuelingRecord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      FuelingRecord.belongsTo(models.Vehicle, { foreignKey: "vehicleId" });
    }
  }
  FuelingRecord.init(
    {
      fuelingDate: DataTypes.DATE,
      vehicleId: DataTypes.UUID,
      fuelingLocation: DataTypes.STRING,
      gallonsFilled: DataTypes.FLOAT,
      totalCost: DataTypes.FLOAT,
      fuelType: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "FuelingRecord",
    }
  );
  return FuelingRecord;
};
