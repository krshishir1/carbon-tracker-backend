const User = require("../../models/user");

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

    const newUser = new User({
        name,
        username,
        email,
        password,
        avatarUrl,
    })

    await newUser.save();

    const jwtToken = await jwt.sign({ ...newUser }, "secret")

    res.status(201).json({ token: jwtToken, message: "User created successfully" });

  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};

