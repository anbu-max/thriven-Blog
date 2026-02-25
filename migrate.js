import ConnectDB from "./lib/config/ConnectDB.js";
import BlogModel from "./lib/model/BlogModel.js";

async function migrate() {
    try {
        await ConnectDB();
        console.log("Connected to DB for migration.");

        // Rename Technology to Tech
        const techUpdate = await BlogModel.updateMany({ category: "Technology" }, { $set: { category: "Tech" } });
        console.log(`Updated ${techUpdate.modifiedCount} blogs from Technology to Tech.`);

        // Rename Lifestyle to Philosophy
        const lifestyleUpdate = await BlogModel.updateMany({ category: "Lifestyle" }, { $set: { category: "Philosophy" } });
        console.log(`Updated ${lifestyleUpdate.modifiedCount} blogs from Lifestyle to Philosophy.`);

        process.exit(0);
    } catch (error) {
        console.error("Migration failed:", error);
        process.exit(1);
    }
}

migrate();
