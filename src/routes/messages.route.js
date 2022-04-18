const { Router } = require("express");
const { check } = require("express-validator");

const { getAll, create } = require("../controllers/messages.controller");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

router.get("/", [validateJWT], getAll);
router.post(
  "/",
  [
    check("title", "Title must not be empety").not().isEmpty(),
    check("email", "Must be a valid email").isEmail().not().isEmpty(),
    check("body", "Body must be not empty").not().isEmpty(),
    validateFields,
  ],
  create
);

module.exports = router;
