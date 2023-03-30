const router = require("express").Router();
const controller = require("../../controllers/admin/user.controller");
const passport = require("passport");
const { isAdmin } = require("./../../middlewares/role");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  controller.getUsers
);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  controller.getUserById
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  controller.deleteUserById
);

module.exports = router;
