"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("MaintenanceRecords", {
      id: {
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      vehicleId: {
        type: Sequelize.UUID,
        references: { model: "Vehicles", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      maintenanceType: {
        type: Sequelize.STRING,
      },
      maintenanceDate: {
        type: Sequelize.DATE,
      },
      maintenanceCost: {
        type: Sequelize.FLOAT,
      },
      notes: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable("MaintenanceRecords");
  },
};
