const mongoose = require("mongoose")

const trackSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    dateCreated: {
        type: Date,
        required: true
    },
    answers: [{
        type: Object
    }]
}, {
    timestamps: true
})

const Track = mongoose.model("Track", trackSchema)
module.exports = Track