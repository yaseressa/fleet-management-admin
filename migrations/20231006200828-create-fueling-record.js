"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("FuelingRecords", {
      id: {
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      fuelingDate: {
        type: Sequelize.DATE,
      },
      fuelingLocation: {
        type: Sequelize.STRING,
      },
      fuelType: {
        type: Sequelize.STRING,
      },
      vehicleId: {
        type: Sequelize.UUID,
        references: {
          model: "Vehicles",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      gallonsFilled: {
        type: Sequelize.FLOAT,
      },
      totalCost: {
        type: Sequelize.FLOAT,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("FuelingRecords");
  },
};
