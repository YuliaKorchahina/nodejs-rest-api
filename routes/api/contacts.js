const express = require("express");

const Joi = require("joi");

// const contactsService = require("../../models/contacts");
const Contact =require("../../models/contact")

const { HttpError } = require("../../helpers");

const router = express.Router();

const addValidationSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().trim().email().required(),
  phone: Joi.string().required()
});

router.get("/", async (req, res, next) => {
  try {
    const result = await Contact.find();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// router.get("/:id", async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const result = await contactsService.getContactById(id);
//     if (!result) {
//       throw HttpError(404, "Not found");
//     }
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// });

router.post("/", async (req, res, next) => {
  try {
    const { error } = addValidationSchema.validate(req.body);
    if (error) {
      throw HttpError(400, "missing required name field");
    }
    const result = await Contact.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

// router.delete("/:id", async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const result = await contactsService.removeContact(id);
//     if (!result) {
//       throw HttpError(404, "Not found");
//     }
//     res.status(200).json({
//       message: "contact deleted"
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// router.put("/:id", async (req, res, next) => {
//   try {
//     const { error } = addValidationSchema.validate(req.body);
//     if (error) {
//       throw HttpError(400, "missing fields");
//     }
//     const { id } = req.params;
//     const result = await contactsService.updateContact(id, req.body);
//     if (!result) {
//       throw HttpError(404, "Not Found");
//     }
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
