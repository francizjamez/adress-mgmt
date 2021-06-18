const express = require("express");
const authRouter = require("./routes/auth.route");
const mongoose = require("mongoose");
const { defaultMiddleWares, validateRequest } = require("./middlewares");
const addressRouter = require("./routes/address.route");
require("dotenv").config();

const PORT = 6000;

const app = express();

app.use(defaultMiddleWares);

app.use("/auth", authRouter);
app.use("/address", validateRequest, addressRouter);

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
