const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseEr } = require("../helpers");

const addValidationSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().trim().email().required(),
  phone: Joi.string().required()
});

const isFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required()
});

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"]
    },
    email: {
      type: String
    },
    phone: {
      type: String
    },
    favorite: {
      type: Boolean,
      default: false
    }
  },
  { versionKey: false }
);

contactsSchema.post("save", handleMongooseEr);

const Contact = model("contact", contactsSchema);

const schemas = {
  addValidationSchema,
  isFavoriteSchema
};

module.exports = {
  Contact,
  schemas
};
