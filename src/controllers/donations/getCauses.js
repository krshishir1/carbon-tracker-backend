const Cause = require("../../models/causes");

module.exports = async (req, res) => {
    try {
        const causes = await Cause.find({});

        // Seed some causes if none exist (for hackathon demo)
        if (causes.length === 0) {
            const seedCauses = [
                { name: "TeamTrees", description: "Planting trees around the globe.", goal: 20000000 },
                { name: "Ocean Cleanup", description: "Cleaning up the Great Pacific Garbage Patch.", goal: 5000000 },
                { name: "EarthJustice", description: "Legal powerhouse for environmental protection.", goal: 10000000 }
            ];
            await Cause.insertMany(seedCauses);
            return res.status(200).json({ causes: await Cause.find({}) });
        }

        res.status(200).json({ causes });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
