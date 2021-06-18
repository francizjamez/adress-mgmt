const addressModel = require("../models/address.model");

const getAllAdresses = async (req, res) => {
  console.log(req.query);
  const addresses = await addressModel.find({ user: req._id, ...req.query });
  res.status(200).send(addresses);
};

const addAddress = async (req, res) => {
  const newAddress = new addressModel({ ...req.body, user: req._id });

  try {
    const addressRes = await newAddress.save();
    res.status(201).send(addressRes);
  } catch (err) {
    res.status(403).send(err.message);
  }
};

const deleteAddress = async (req, res) => {
  const addressRes = await addressModel.deleteOne({ _id: req.params.id });

  if (addressRes.n) {
    return res
      .status(200)
      .send({ message: `Successfully deleted ${req.params.id}` });
  } else {
    return res.status(400).send({ error: `No address exists` });
  }
};

const updateAddress = async (req, res) => {
  const updateRes = await addressModel.updateOne(
    { _id: req.params.id },
    req.body
  );

  if (!updateRes.ok) {
    return res.status(400).send({ error: `Invalid keys to update` });
  }

  if (!updateRes.n) {
    return res.status(400).send({ error: `No address exists` });
  }

  return res
    .status(201)
    .send({ message: `Successfully updated ${req.params.id}` });
};

module.exports = { getAllAdresses, addAddress, deleteAddress, updateAddress };
