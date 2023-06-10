const express = require("express");

const router = express.Router();

const { authentificate, 
  upload
 } = require("../../middlewares");
const { validateBody } = require("../../helpers");
const { schemas } = require("../../models/user");
const ctrlWrapper = require("../../controllers/auth-controllers");

router.post(
  "/register",
  validateBody(schemas.registerSchema),
  ctrlWrapper.register
);

router.post("/login", validateBody(schemas.loginSchema), ctrlWrapper.login);

router.get("/users/current", authentificate, ctrlWrapper.getCurrent);

router.post("/logout", authentificate, ctrlWrapper.logout);

router.patch(
  "/users/avatars",
  authentificate,
  upload.single("avatar"),
  ctrlWrapper.updateAvatar
);
module.exports = router;
