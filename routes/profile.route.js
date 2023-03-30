const router = require("express").Router();
const controller = require("../controllers/profile.controller");
const passport = require("passport");
const { isUser } = require("./../middlewares/role");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  isUser,
  controller.getProfile
);

router.patch(
  "/",
  passport.authenticate("jwt", { session: false }),
  isUser,
  controller.updateProfile
);

router.patch(
  "/password",
  passport.authenticate("jwt", { session: false }),
  isUser,
  controller.updatePassword
);

module.exports = router;
