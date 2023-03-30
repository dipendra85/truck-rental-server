const { DataTypes } = require("sequelize");
const sequelize = require("./../db/db");

const Vehicle = sequelize.define("vehicle", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  numberPlate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pricePerDay: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  images: {
    type: DataTypes.TEXT,
    allowNull: false,
    get: function () {
      return this.getDataValue("images").split(",");
    },
    set: function (val) {
      this.setDataValue("images", val.join());
    },
  },
  publicIds: {
    type: DataTypes.TEXT,
    allowNull: false,
    get: function () {
      return this.getDataValue("publicIds").split(",");
    },
    set: function (val) {
      this.setDataValue("publicIds", val.join());
    },
  },
});

module.exports = Vehicle;
