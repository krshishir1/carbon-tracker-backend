const Cause = require("../../models/causes");
const Donation = require("../../models/donations");
const User = require("../../models/user");
const Post = require("../../models/posts");

module.exports = async (req, res) => {
    try {
        const { userId, causeId, postId, amount, isAnonymous } = req.body;

        const donation = new Donation({
            userId,
            causeId,
            postId,
            amount,
            isAnonymous
        });

        await donation.save();

        await Cause.findByIdAndUpdate(causeId, { $inc: { totalRaised: amount } });

        const userUpdate = { $inc: { totalDonated: amount, impactScore: Math.floor(amount * 5) } };
        await User.findByIdAndUpdate(userId, userUpdate);

        if (postId) {
            await Post.findByIdAndUpdate(postId, { $inc: { donations: amount } });
        }

        res.status(201).json({ message: "Donation successful! Thank you for your impact. 💚", donation });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
