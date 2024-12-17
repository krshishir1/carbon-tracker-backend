const Track = require("../../models/tracks");
const User = require("../../models/user");
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

      await User.findByIdAndUpdate(userId, {
        $push: { activities: { dateOfTrack: dateCreated, totalEmissions: answers[0].emissions}}
      })


      res.status(201).json({ message: "Track created successfully" });
    } else {
        const returnDoc = await Track.findOneAndUpdate(
            { userId, dateCreated },
            { answers },
            { returnDocument: "after" }
        )

        let totalEmissions = 0;
        answers.forEach((answer) => {
            totalEmissions += answer.emissions;
        })

        await User.findOneAndUpdate(
            { _id: userId, "activities.dateOfTrack": dateCreated },
            { $set: { "activities.$.totalEmissions": totalEmissions } }
        )

        res.status(201).json({ message: "Track updated successfully" });

    }

  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};
