const { Router } = require("express");
const { check } = require("express-validator");

const { create, getAll } = require("../controllers/users.controller");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

router.get("/", [validateJWT], getAll);
router.post(
  "/",
  [
    check("name").notEmpty(),
    check("email").notEmpty(),
    check("password").notEmpty(),
    validateFields,
  ],
  create
);

module.exports = router;
