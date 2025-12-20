const Post = require("../../models/posts");

module.exports = async (req, res) => {
    try {
        const { postId } = req.params;
        const comments = await Post.find({ rootPost: postId })
            .sort({ createdAt: 1 });

        res.status(200).json({ comments });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
