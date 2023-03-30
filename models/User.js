const { DataTypes } = require("sequelize");
const sequelize = require("./../db/db");
const bcrypt = require("bcryptjs");

const User = sequelize.define(
  "user",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      default: "user",
    },
  },
  {
    hooks: {
      beforeCreate: (user) => {
        user.password = bcrypt.hashSync(user.password, 12);
      },
    },
  }
);

module.exports = User;
