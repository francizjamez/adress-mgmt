const express = require("express");
const authRouter = require("./routes/auth.route");
const mongoose = require("mongoose");
const { defaultMiddleWares } = require("./middlewares");
require("dotenv").config();

const PORT = 6000;

const app = express();

app.use(defaultMiddleWares);

app.use("/auth", authRouter);

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
