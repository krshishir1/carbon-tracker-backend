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
    likes: {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    },
    imageUrl: String
}, {
    timestamps: true
})

const Post = mongoose.model("Post", postSchema)
module.exports = Post