const express = require("express");
const morgan = require("morgan");
const jwt = require("jsonwebtoken");

const defaultMiddleWares = [express.json(), morgan("tiny")];

const validateRequest = (req, res, next) => {
  if (!req.headers.authorization)
    return res.status(403).send({ error: "No authorization provided" });

  const accessToken = req.headers.authorization.split(" ")[1];
  if (!accessToken) return res.status(403).send({ error: "no token provided" });

  try {
    const verifyToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    req._id = verifyToken.id;
    next();
  } catch (err) {
    res.status(403).send(err);
  }
};

module.exports = { defaultMiddleWares, validateRequest };
