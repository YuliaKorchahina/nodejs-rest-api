const express = require("express");

const router = express.Router();

const { validateBody } = require("../../helpers");
const { schemas } = require("../../models/user");
const ctrlWrapper = require("../../controllers/auth-controllers");

router.post("/register", validateBody(schemas.registerSchema), ctrlWrapper.register);

router.post("/login", validateBody(schemas.loginSchema), ctrlWrapper.login);

module.exports = router;
