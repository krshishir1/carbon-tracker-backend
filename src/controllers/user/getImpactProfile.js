const User = require("../../models/user");

module.exports = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).select("-password -activities");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
