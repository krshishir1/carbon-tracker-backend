const mongoose = require("mongoose");

const causeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: String,
    totalRaised: {
        type: Number,
        default: 0
    },
    goal: Number,
    websiteUrl: String
}, { timestamps: true });

const Cause = mongoose.model("Cause", causeSchema);
module.exports = Cause;
