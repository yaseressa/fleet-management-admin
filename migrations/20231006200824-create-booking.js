"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Bookings", {
      id: {
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      customerId: {
        type: Sequelize.UUID,
        references: { model: "Customers", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },

      bookingDate: {
        type: Sequelize.DATE,
      },
      startLocation: {
        type: Sequelize.STRING,
      },
      endLocation: {
        type: Sequelize.STRING,
      },
      tripPurpose: {
        type: Sequelize.STRING,
      },
      status: {
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
    await queryInterface.dropTable("Bookings");
  },
};
