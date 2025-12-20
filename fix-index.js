const mongoose = require("mongoose");
require("dotenv").config();

async function fixIndex() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB...");

        const db = mongoose.connection.db;
        const collection = db.collection("users");

        console.log("Checking indexes...");
        const indexes = await collection.indexes();
        console.log("Current indexes:", indexes.map(idx => idx.name));

        if (indexes.some(idx => idx.name === "googleId_1")) {
            console.log("Dropping index 'googleId_1'...");
            await collection.dropIndex("googleId_1");
            console.log("Index dropped successfully.");
        } else {
            console.log("Index 'googleId_1' not found, nothing to drop.");
        }

        process.exit(0);
    } catch (err) {
        console.error("Error fixing index:", err);
        process.exit(1);
    }
}

fixIndex();
