const express = require("express");

const router = express.Router();
const { validationResult } = require("express-validator");
const { getAllCategories } = require("../controllers/categoriesController");
const {
  userRegistration,
  verifyToken,
  requestNewOtp,
  signIn
} = require("../controllers/user");
const { authorizedToken } = require("../authorization/authorization");
const { getAllCountry } = require("../controllers/helperController");

router.use(authorizedToken);

const validate = validations => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(422).json({ errors: errors.array() });
  };
};

// enter route info as below
router.route("/item/inventory-item/create").get((req, res) => {
  return res.status(200).send({
    message: "Item is live"
  });
});
router.route("/user").post(userRegistration);
router.route("/categories").get(getAllCategories);
router.route("/verify").post(verifyToken);
router.route("/new-token").get(requestNewOtp);
router.route("/login").post(signIn);
router.route("/country").get(getAllCountry);

module.exports = router;
