'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Seeds', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      daysToGerm: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      daysToMaturity: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      plantingDepth: {
        type: Sequelize.FLOAT
      },
      daysToHarvest: {
        type: Sequelize.INTEGER
      },
      spacingHeight: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      spacingWidth: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      instructions: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      plantType: {
        allowNull: false,
        type: Sequelize.STRING
      },
      growsBestIn: {
        allowNull: false,
        type: Sequelize.STRING
      },
      growingHeight: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      frontOfPacketPhoto: {
        allowNull: false,
        type: Sequelize.STRING
      },
      backOfPacketPhoto: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Seeds');
  }
};