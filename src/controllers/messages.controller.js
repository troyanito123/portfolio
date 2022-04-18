const { response } = require("express");
const { Message } = require("../database/models/index");

const getAll = async (req, res = response) => {
  try {
    const data = await Message.findAll();
    res.json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

const create = async (req, res = response) => {
  try {
    const { title, email, body } = req.body;
    const data = await Message.create({ title, email, body });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getAll,
  create,
};
