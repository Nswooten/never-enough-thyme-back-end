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
      GardenBed.belongsTo(models.Profile, {
        as: "gardenBeds", 
        foreignKey: "profileId"
      })
      GardenBed.belongsToMany(models.Seed, {
        as: "seeds",
        through: models.GardenBedSeed,
        foreignKey: "gardenBedId"
      })
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