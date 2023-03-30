const express = require("express");
const cors = require("cors");
const sequelize = require("./db/db");
const app = express();
const passport = require("passport");
require("./security/passport")(passport);

// routes  origin: "*" }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// admin routes
const AdminBrandRoute = require("./routes/admin/brand.route");

// user routes
const AuthRoute = require("./routes/auth.route");
const UserProfileRoute = require("./routes/profile.route");

// admin routes
app.use("/api/admin/brands", AdminBrandRoute);

// users routes middlewares
app.use("/api/auth", AuthRoute);
app.use("/api/users/profile", UserProfileRoute);

sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => console.log(err));

module.exports = app;
