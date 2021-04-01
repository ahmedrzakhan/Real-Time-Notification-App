const express = require("express");
const { body } = require("express-validator");

const {
  getDepartments,
  loginUser,
  registerUser,
} = require("./../controllers/user-controller");

const router = express.Router();

router.post("/register", [body("email").isEmail()], registerUser);

router.post("/login", loginUser);

router.get("/departments", getDepartments);

module.exports = router;
