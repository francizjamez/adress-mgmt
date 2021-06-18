const mongoose = require("mongoose");

const refreshTokenSchema = new mongoose.Schema({
  refresh_token: { type: "string", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

module.exports = refreshTokenModel = new mongoose.model(
  "refresh_token",
  refreshTokenSchema
);
