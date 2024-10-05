const Track = require("../../models/tracks");
const Joi = require("joi");

module.exports = async (req, res) => {
  try {
    const querySchema = Joi.object({
      userId: Joi.string().required(),
      dateCreated: Joi.date(),
    });

    const { error } = querySchema.validate(req.query);
    const isValid = error === undefined || null;
    if (!isValid) throw new Error(error.message);

    const { userId, dateCreated } = req.query;

    const foundTrack = await Track.findOne({ userId, dateCreated });

    res.status(200).json({ answers: [...foundTrack.answers] });

  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};
