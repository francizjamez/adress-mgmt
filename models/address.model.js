const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  city: { type: String, required: true },
  pincode: { type: Number, required: true },
  state: { type: String, required: true },
  label: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

module.exports = addressModel = new mongoose.model("address", userSchema);
