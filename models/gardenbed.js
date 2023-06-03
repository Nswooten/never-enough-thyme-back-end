'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GardenBed extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  GardenBed.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    width: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    profileId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'Profiles',
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'GardenBed',
  });
  return GardenBed;
};