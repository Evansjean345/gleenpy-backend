const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const partnerSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  date: { type: String },
});

partnerSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Partner", partnerSchema);
