"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Expense extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Expense.belongsTo(models.Vehicle, {
        foreignKey: "vehicleId",
      });
    }
  }
  Expense.init(
    {
      expenseType: DataTypes.STRING,
      expenseDate: DataTypes.DATE,
      amount: DataTypes.FLOAT,
      description: DataTypes.TEXT,
      vehicleId: Sequelize.UUID,
    },
    {
      sequelize,
      modelName: "Expense",
    }
  );
  return Expense;
};
