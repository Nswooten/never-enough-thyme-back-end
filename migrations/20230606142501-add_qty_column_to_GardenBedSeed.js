'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'GardenBedSeeds', 
      'qty', {
        defaultValue: 1, 
        type: Sequelize.INTEGER 
      }
    )
  },
  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('GardenBedSeeds', 'qty', )
  }
};
