const { DataTypes } = require("sequelize");
const sequelize = require("./../db/db");

const Brand = sequelize.define("brand", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  publicId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Brand;
