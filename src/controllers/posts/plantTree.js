const Post = require("../../models/posts");
const User = require("../../models/user");

module.exports = async (req, res) => {
    try {
        const { postId, userId } = req.body;

        const user = await User.findById(userId);
        if (!user) throw new Error("User not found");

        // Daily cap logic (e.g., 5 trees per day)
        const today = new Date().setHours(0, 0, 0, 0);
        const lastUpdate = new Date(user.dailyTreesPlanted.lastUpdated).setHours(0, 0, 0, 0);

        if (today > lastUpdate) {
            user.dailyTreesPlanted.count = 0;
            user.dailyTreesPlanted.lastUpdated = Date.now();
        }

        if (user.dailyTreesPlanted.count >= 5) {
            return res.status(400).json({ message: "Daily tree planting limit reached! Try again tomorrow 🌳" });
        }

        const post = await Post.findById(postId);
        if (!post) throw new Error("Post not found");

        if (post.trees.includes(userId)) {
            return res.status(400).json({ message: "You've already planted a tree here!" });
        }

        post.trees.push(userId);
        await post.save();

        user.treesPlanted += 1;
        user.dailyTreesPlanted.count += 1;
        user.impactScore += 10; // Impact points for planting a tree
        await user.save();

        res.status(200).json({ message: "Tree planted! 🌳", treeCount: post.trees.length });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
