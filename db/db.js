const { Sequelize } = require("sequelize");

module.exports = sequelize = new Sequelize("truck_rental", "root", "root", {
  dialect: "mysql",
  host: "localhost",
});
