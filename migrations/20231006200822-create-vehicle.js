"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Vehicles", {
      id: {
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      vehicleType: {
        type: Sequelize.STRING,
      },
      vehicleMake: {
        type: Sequelize.STRING,
      },
      vehicleModel: {
        type: Sequelize.STRING,
      },
      vehicleLicensePlate: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      currentLocation: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      status: {
        allowNull: false,
        unique: true,
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
    await queryInterface.dropTable("Vehicles");
  },
};
