const express = require("express");

const ctrlWrapper = require('../../controllers/contacts-controllers')
const {isValidId}= require("../../middlewares")
const {validateBody}= require('../../helpers');
const {schemas} = require("../../models/contact")
  

const router = express.Router();

router.get("/", ctrlWrapper.getAllContacts);

router.get("/:id", isValidId, ctrlWrapper.getContactById)

router.post("/", validateBody(schemas.addValidationSchema), ctrlWrapper.addContact );

router.delete("/:id", isValidId, ctrlWrapper.removeContact);

router.put("/:id", validateBody(schemas.addValidationSchema), isValidId, ctrlWrapper.updateContactById);

router.patch("/:id/favorite",validateBody(schemas.isFavoriteSchema),  isValidId, ctrlWrapper.updateContactById);

module.exports = router;
