const express = require("express");
const { requestNewToken } = require("../controllers/token.controller.js");
const {
  signUpUser,
  loginUser,
  logoutUser,
} = require("../controllers/user.controller.js");
const { validateRequest } = require("../middlewares.js");

const authRouter = express.Router();

authRouter.post("/signup", signUpUser);
authRouter.post("/login", loginUser);
authRouter.get("/logout", validateRequest, logoutUser);
authRouter.post("/token", requestNewToken);

module.exports = authRouter;
