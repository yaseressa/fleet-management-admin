"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Trip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Trip.belongsTo(models.Vehicle, { foreignKey: "vehicleId" });
      Trip.belongsTo(models.Booking, { foreignKey: "bookingId" });
      Trip.belongsTo(models.Driver, { foreignKey: "driverId" });
    }
  }
  Trip.init(
    {
      startTime: DataTypes.DATE,
      endTime: DataTypes.DATE,
      distanceTraveled: DataTypes.FLOAT,
      tripStatus: DataTypes.STRING,
      vehicleId: DataTypes.UUID,
      driverId: DataTypes.UUID,
      bookingId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Trip",
    }
  );
  return Trip;
};
