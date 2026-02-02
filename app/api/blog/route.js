import { writeFile, mkdir } from "fs/promises";
import { NextResponse } from "next/server";
import ConnectDB from "@/lib/config/ConnectDB";
import BlogModel from "@/lib/model/BlogModel";
import path from "path";

export async function GET(request) {
  try {
    await ConnectDB();
    const blogs = await BlogModel.find({});
    return NextResponse.json({ blogs });
  } catch (error) {
    console.error("GET API Error (Falling back to empty):", error);
    // Return empty blogs list instead of 500 to let frontend handle it
    return NextResponse.json({ blogs: [], error: "Database connection failed - falling back to static data" }, { status: 200 });
  }
}

export async function POST(request) {
  try {
    await ConnectDB();

    const formData = await request.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const category = formData.get("category");
    const author = formData.get("author");
    const authorImg = formData.get("authorImg");
    const image = formData.get("image");

    if (!title || !description || !category || !author) {
        return NextResponse.json({ error: "Missing required fields (Title, Description, Category, or Author)" }, { status: 400 });
    }

    if (!image || typeof image === "string") {
      return NextResponse.json({ error: "Blog image file is required" }, { status: 400 });
    }

    // Prepare filename and path
    const timestamp = Date.now();
    const fileName = `${timestamp}_${image.name.replace(/\s+/g, '_')}`;
    const buffer = Buffer.from(await image.arrayBuffer());
    
    // Ensure public folder exists and use absolute path
    const publicDir = path.join(process.cwd(), "public");
    const filePath = path.join(publicDir, fileName);
    
    try {
        await writeFile(filePath, buffer);
    } catch (fsErr) {
        console.error("File System Error:", fsErr);
        return NextResponse.json({ error: "System failed to save image to public folder. Check folder permissions." }, { status: 500 });
    }

    const imgUrl = `/${fileName}`;

    // save to Mongo
    const blogData = {
      title,
      description,
      category,
      author,
      authorImg: authorImg || "/profile_icon.png",
      image: imgUrl,
    };
    
    const newBlog = new BlogModel(blogData);
    await newBlog.save();

    return NextResponse.json({ msg: "Blog Published Successfully!", blog: newBlog });
  } catch (err) {
    console.error("POST API Error:", err);
    // Be specific about connection errors in the response
    const isConnError = err.message.includes('ENOTFOUND') || err.message.includes('timeout');
    const userMsg = isConnError 
        ? "Database Connection Failed. Check your internet or MongoDB URI." 
        : `Server Error: ${err.message}`;

    return NextResponse.json({ error: userMsg }, { status: 500 });
  }
}


