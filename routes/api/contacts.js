const express = require("express");

const contactsController = require("../../controllers/contacts-controllers");

// const Contact = require("../../models/contact");

const router = express.Router();

router.get("/", contactsController.getAllContacts);

router.get("/:id", contactsController.getContactById)

router.post("/", contactsController.addContact );

router.delete("/:id", contactsController.removeContact);

router.put("/:id", contactsController.updateContactById);

module.exports = router;
