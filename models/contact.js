const { Schema, model } = require("mongoose");

const contactsSchema = new Schema({
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
}, {versionKey: false, timestamps: true});

contactsSchema.post('save', (er, data, next)=>{
    er.status = 400;
    next()
})

const Contact = model("contact", contactsSchema);

module.exports = {
  Contact
};
