const User = require("../../models/user");
const Joi = require("joi");

module.exports = async (req, res) => {
  try {
    const querySchema = Joi.object({
      userId: Joi.string().required(),
    });

    const { error } = querySchema.validate(req.query);
    const isValid = error === undefined || null;
    if (!isValid) throw new Error(error.message);

    const { userId } = req.query;

    console.log(req.username)
    const foundUser = await User.findOne({ username: req.username });

    if(!foundUser) throw new Error("User not found");

    console.log(foundUser.activities)

    res.status(200).json({ history: [...foundUser.activities] });

  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};
