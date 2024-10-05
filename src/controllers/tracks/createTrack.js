const Track = require("../../models/tracks");
const Joi = require("joi");

module.exports = async (req, res) => {
  try {
    const bodySchema = Joi.object({
      userId: Joi.string().required(),
      dateCreated: Joi.date(),
      answers: Joi.any(),
    });

    const { error } = bodySchema.validate(req.body);
    const isValid = error === undefined || null;
    if (!isValid) throw new Error(error.message);

    const { userId, dateCreated, answers } = req.body;

    const foundTrack = await Track.findOne({ userId, dateCreated });

    if (!foundTrack) {
      const newTrack = new Track({
        userId,
        dateCreated,
        answers,
      });

      await newTrack.save();

      res.status(201).json({ message: "Track created successfully" });
    } else {
        const returnDoc = await Track.findOneAndUpdate(
            { userId, dateCreated },
            { answers },
            { returnDocument: "after" }
        )

        res.status(201).json({ message: "Track updated successfully" });

    }

  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};
