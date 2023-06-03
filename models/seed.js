'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Seed extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Seed.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    daysToGerm: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    daysToMaturity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    plantingDepth: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    daysToHarvest: {
      type: DataTypes.INTEGER,
    },
    spacingHeight: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    spacingWidth: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    instructions: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    plantType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    growsBestIn: {
      type: DataTypes.STRING,
      allowNull: false
    },
    growingHeight: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    frontOfPacketPhoto: {
      type: DataTypes.STRING,
      allowNull: false
    },
    backOfPacketPhoto: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Seed',
  });
  return Seed;
};