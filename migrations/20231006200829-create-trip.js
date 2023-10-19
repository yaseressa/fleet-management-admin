"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Trips", {
      id: {
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      vehicleId: {
        type: Sequelize.UUID,
        references: { model: "Vehicles", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      bookingId: {
        type: Sequelize.UUID,
        references: { model: "Bookings", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      driverId: {
        type: Sequelize.UUID,
        references: { model: "Drivers", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },

      startTime: {
        type: Sequelize.DATE,
      },
      endTime: {
        type: Sequelize.DATE,
      },
      distanceTraveled: {
        type: Sequelize.FLOAT,
      },
      tripStatus: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("Trips");
  },
};
