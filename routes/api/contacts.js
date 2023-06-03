const express = require("express");

const { authentificate } = require("../../middlewares");
const ctrlWrapper = require("../../controllers/contacts-controllers");
const { isValidId } = require("../../middlewares");
const { validateBody } = require("../../helpers");
const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", authentificate, ctrlWrapper.getAllContacts);

router.get("/:id", authentificate, isValidId, ctrlWrapper.getContactById);

router.post(
  "/",
  authentificate,
  validateBody(schemas.addValidationSchema),
  ctrlWrapper.addContact
);

router.delete("/:id", authentificate, isValidId, ctrlWrapper.removeContact);

router.put(
  "/:id",
  authentificate,
  validateBody(schemas.addValidationSchema),
  isValidId,
  ctrlWrapper.updateContactById
);

router.patch(
  "/:id/favorite",
  authentificate,
  validateBody(schemas.isFavoriteSchema),
  isValidId,
  ctrlWrapper.updateContactById
);

module.exports = router;
