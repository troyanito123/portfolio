const { response } = require("express");

const { User } = require("../database/models/index");
const { generateJWT } = require("../helpers/generate-jwt");

const getAll = async (req, res = response) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);

    console.log({ tokenData: req.user });
  } catch (error) {
    res.status(500).json(error);
  }
};

const create = async (req, res = response) => {
  try {
    const user = await User.create(req.body);

    const { id, name, email, role } = user;

    const token = await generateJWT({ id, name, email, role });

    res.status(201).json({ id, name, email, role, token });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getAll,
  create,
};
