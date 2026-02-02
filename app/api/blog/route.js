import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import ConnectDB from "@/lib/config/ConnectDB";
import BlogModel from "@/lib/model/BlogModel";

export async function GET(request) {
  try {
    await ConnectDB();
    const blogs = await BlogModel.find({});
    return NextResponse.json({ blogs });
  } catch (error) {
    console.error("GET API Error (Falling back to empty):", error);
    // Return empty blogs list instead of 500 to let frontend handle it
    return NextResponse.json({ blogs: [], error: "Database connection failed" }, { status: 200 });
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

    if (!image) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }

    // save image
    const timestamp = Date.now();
    const buffer = Buffer.from(await image.arrayBuffer());
    const path = `./public/${timestamp}_${image.name}`;
    await writeFile(path, buffer);

    const imgUrl = `/${timestamp}_${image.name}`;

    // save to Mongo
    const blogData = {
      title,
      description,
      category,
      author,
      authorImg,
      image: imgUrl,
    };
    const newBlog = new BlogModel(blogData);
    await newBlog.save();

    return NextResponse.json({ msg: "Blog created", blog: newBlog });
  } catch (err) {
    console.error("POST API Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}


