const Joi = require("joi");

const { HttpError } = require("../helpers/HttpError");

const contactsService = require("../models/contacts");

const { ctrlWrapper } = require("../decorators");

const addValidationSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().trim().email().required(),
  phone: Joi.string().required()
});

const getAllContacts = async (req, res) => {
  const result = await contactsService.listContacts();
  res.json(result);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.getContactById(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const { error } = addValidationSchema.validate(req.body);
  if (error) {
    throw HttpError(400, "missing required name field");
  }
  const result = await contactsService.addContact(req.body);
  res.status(201).json(result);
};

const removeContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.removeContact(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({
    message: "contact deleted"
  });
};

const updateContactById = async (req, res) => {
  const { error } = addValidationSchema.validate(req.body);
  if (error) {
    throw HttpError(400, "missing fields");
  }
  const { id } = req.params;
  const result = await contactsService.updateContact(id, req.body);
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.json(result);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContactById: ctrlWrapper(updateContactById),
};
