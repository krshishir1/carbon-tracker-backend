const mongoose = require("mongoose");
const validator = require("validator");

const { hashPassword } = require("../passwordManagement");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    require: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: "Email is invalid",
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  age: Number,
  members: Number,
  avatarUrl: String,

}, {timestamps: true});

userSchema.pre("save", async function () {
  const hashedPassword = await hashPassword(this.password);
  if (hashedPassword) {
    this.password = hashedPassword;
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
