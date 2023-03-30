const router = require("express").Router();
const controller = require("../../controllers/admin/brand.controller");
const upload = require("./../../middlewares/multer");
const passport = require("passport");
const { isAdmin } = require("./../../middlewares/role");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  controller.getBrands
);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  controller.getBrandById
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  upload.single("image"),
  controller.postBrand
);

router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  upload.single("image"),
  controller.updateBrand
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  controller.deleteBrandById
);

module.exports = router;
