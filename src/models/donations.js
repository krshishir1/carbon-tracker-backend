const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    },
    causeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cause",
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    isAnonymous: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Donation = mongoose.model("Donation", donationSchema);
module.exports = Donation;
