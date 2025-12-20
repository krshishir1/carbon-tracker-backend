const mongoose = require("mongoose")

const authorSchema = new mongoose.Schema({
    name: String,
    username: String,
    avatarUrl: String
})

const postSchema = new mongoose.Schema({
    author: {
        type: authorSchema
    },
    content: {
        type: String,
        required: true
    },
    rootPost: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    },
    parentPost: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    },
    orderId: {
        type: Number,
        required: true
    },
    trees: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        default: []
    },
    impactTag: {
        type: String,
        enum: ["Air", "Water", "Plastic", "Climate"],
    },
    imageUrl: String,
    videoUrl: String,
    donations: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

const Post = mongoose.model("Post", postSchema)
module.exports = Post