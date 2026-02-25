import mongoose from "mongoose";
import BlogModel from "./lib/model/BlogModel.js";

import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function checkBlogs() {
    const URI = process.env.MONGODB_URI;
    if (!URI) {
        console.error("MONGODB_URI not found");
        process.exit(1);
    }
    await mongoose.connect(URI);
    const blogs = await BlogModel.find({});
    blogs.forEach(b => {
        console.log(`Title: ${b.title}`);
        console.log(`Image: ${b.image}`);
        console.log('---');
    });
    process.exit(0);
}

checkBlogs();
