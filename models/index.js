// import models
const User = require("./User");
const Brand = require("./Brand");
const Vehicle = require("./Vehicle");

Vehicle.belongsTo(Brand, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Vehicle.belongsTo(User, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

module.exports = {
  User,
  Brand,
  Vehicle,
};
