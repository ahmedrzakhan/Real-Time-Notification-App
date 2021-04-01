const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    date: { type: Date, required: true },
    department: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    name: { type: String, trim: true },
    password: { type: String, required: true, trim: true },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("users", userSchema);
