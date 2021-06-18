const express = require("express");
const {
  getAllAdresses,
  addAddress,
  deleteAddress,
  updateAddress,
} = require("../controllers/address.controller");

const addressRouter = express.Router();

addressRouter.get("/", getAllAdresses);
addressRouter.post("/", addAddress);
addressRouter.delete("/:id", deleteAddress);
addressRouter.put("/:id", updateAddress);

module.exports = addressRouter;
