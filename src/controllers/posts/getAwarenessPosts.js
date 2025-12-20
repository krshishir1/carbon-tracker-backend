const Post = require("../../models/posts");

module.exports = async (req, res) => {
    try {
        // Only fetch parent posts (not comments)
        const posts = await Post.find({ rootPost: { $exists: false } })
            .sort({ trees: -1, createdAt: -1 })
            .limit(50);

        res.status(200).json({ posts });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
