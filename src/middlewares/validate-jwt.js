const { response, request } = require("express");
const jwt = require("jsonwebtoken");

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header("token");

  if (!token) {
    return res.status(401).json({
      message: "There is not TOKEN in HEADERS",
    });
  }

  try {
    const { id, name, email, role } = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { id, name, email, role };
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: "Invalid TOKEN",
    });
  }
};

module.exports = {
  validateJWT,
};
