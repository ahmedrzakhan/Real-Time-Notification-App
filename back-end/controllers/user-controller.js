const User = require("./../Models/User");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const registerUser = async (req, res) => {
  const { date, department, email, name, password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const emailExists = await User.findOne({ email: email });
  if (emailExists) {
    return res.status(400).send("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));

  const user = new User({
    date,
    department,
    email,
    name,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(400).send("Email or password is incorrect");
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) return res.status(400).send("Invalid Password");

  res.send(user);
};

const getDepartments = async (req, res) => {
  const departments = await User.distinct("department");
  return res.send(departments);
};

module.exports = { getDepartments, loginUser, registerUser };
