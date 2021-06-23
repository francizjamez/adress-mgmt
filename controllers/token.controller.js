const jwt = require("jsonwebtoken");

const requestNewToken = async (req, res) => {
  const refreshToken = req.body.refresh_token;
  try {
    const data = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const payload = { id: data.id };

    const newToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME,
    });

    res.status(200).send({ accessToken: newToken });
  } catch (error) {
    res.status(403).send(error);
  }
};

module.exports = { requestNewToken };
