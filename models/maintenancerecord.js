"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MaintenanceRecord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      MaintenanceRecord.belongsTo(models.Vehicle, { foreignKey: "vehicleId" });
    }
  }
  MaintenanceRecord.init(
    {
      maintenanceType: DataTypes.STRING,
      maintenanceDate: DataTypes.DATE,
      maintenanceCost: DataTypes.FLOAT,
      notes: DataTypes.TEXT,
      vehicleId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "MaintenanceRecord",
    }
  );
  return MaintenanceRecord;
};
