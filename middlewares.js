const express = require("express");
const morgan = require("morgan");

const defaultMiddleWares = [express.json(), morgan("tiny")];

const validateRequest = (req, res) => {};

module.exports = { defaultMiddleWares };
