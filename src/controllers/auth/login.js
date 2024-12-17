const User = require("../../models/user");

const { comparePassword } = require("../../passwordManagement");

const Joi = require("joi");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  try {
    const bodySchema = Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required().min(8),
    });

    const { error } = bodySchema.validate(req.body);

    const isValid = error === undefined || null;
    if (!isValid) throw new Error(error.message);

    const { username, password } = req.body;
    const foundUser = await User.findOne({ username });
    if (!foundUser) throw new Error("User not found");

    const isPassRight = await comparePassword(password, foundUser.password);
    if (!isPassRight) throw new Error("Invalid password");

    const jwtToken = await jwt.sign(
      {
        username: foundUser.username,
        email: foundUser.email,
        userId: foundUser._id,
      },
      "secret"
    );

    res.status(201).json({
      token: jwtToken,
      message: "User created successfully",
      user: {
        username: foundUser.username,
        email: foundUser.email,
        name: foundUser.name,
        _id: foundUser._id,
      },
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};
