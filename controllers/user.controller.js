const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const refreshTokenModel = require("../models/refreshToken.model");

const signUpUser = async (req, res) => {
  const { name, password, email } = req.body;

  if (!password) {
    res.status(403).send({ error: "Please enter a password" });
    return;
  }
  const hash = await bcrypt.hash(password, 10);
  const newUser = new userModel({ name, password: hash, email });

  try {
    const mongoRes = await newUser.save();
    res.status(201).send(mongoRes);
  } catch (err) {
    res.status(403).send(err);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  let foundUser = await userModel.findOne({ email });

  const verifyPassword = await bcrypt.compare(password, foundUser.password);

  if (!verifyPassword)
    return res.status(403).send({ error: "Invalid passworderu" });

  const tokenPayload = { id: foundUser._id };
  const accessToken = jwt.sign(tokenPayload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME,
  });
  const refreshToken = jwt.sign(
    tokenPayload,
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME,
    }
  );

  const newRefreshToken = new refreshTokenModel({
    refresh_token: refreshToken,
  });

  await newRefreshToken.save();

  return res
    .status(201)
    .send({ access_token: accessToken, refresh_token: refreshToken });
};

module.exports = { signUpUser, loginUser };
