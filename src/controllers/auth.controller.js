const { response } = require("express");
const { generateJWT } = require("../helpers/generate-jwt");
const { User } = require("../database/models/index");

const login = async (req, res = response) => {
  const { email, password } = req.body;

  const user = await User.auth(email, password);

  if (!user) {
    return res.status(400).json({ message: "Wrong credentails!" });
  }

  const token = await generateJWT(user);

  res.status(200).json({ ...user, token });
};

module.exports = {
  login,
};
