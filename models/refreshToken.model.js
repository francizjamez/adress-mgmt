const mongoose = require("mongoose");

const refreshTokenSchema = new mongoose.Schema({
  refresh_token: { type: "string", required: true },
});

module.exports = refreshTokenModel = new mongoose.model(
  "refresh_token",
  refreshTokenSchema
);
