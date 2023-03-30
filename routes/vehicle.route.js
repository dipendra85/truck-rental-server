const router = require("express").Router();
const controller = require("../controllers/vehicle.controller");
const passport = require("passport");
const { isUser } = require("./../middlewares/role");

router.get("/", controller.getAllVehicles);

router.get("/:id", controller.getVehicleById);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  isUser,
  controller.createVehicle
);

router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  isUser,
  controller.updateVehicleById
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  isUser,
  controller.deleteVehicleById
);

module.exports = router;
