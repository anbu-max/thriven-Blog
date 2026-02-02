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
    const authorImgFile = formData.get("authorImgFile");

    if (!title || !description || !category || !author) {
        return NextResponse.json({ error: "Missing required fields (Title, Description, Category, or Author)" }, { status: 400 });
    }

    if (!image || typeof image === "string") {
      return NextResponse.json({ error: "Blog image file is required" }, { status: 400 });
    }

    // Process Blog Image
    const timestamp = Date.now();
    const blogImgName = `${timestamp}_${image.name.replace(/\s+/g, '_')}`;
    const blogImgBuffer = Buffer.from(await image.arrayBuffer());
    const publicDir = path.join(process.cwd(), "public");
    const blogUploadDir = path.join(publicDir, "uploads", "blogs");
    await mkdir(blogUploadDir, { recursive: true });
    await writeFile(path.join(blogUploadDir, blogImgName), blogImgBuffer);
    const blogImgUrl = `/uploads/blogs/${blogImgName}`;

    // Process Author Image if uploaded as file
    let finalAuthorImg = authorImg || "/profile_icon.png";
    if (authorImgFile && typeof authorImgFile !== "string") {
        const authorImgName = `${timestamp}_author_${authorImgFile.name.replace(/\s+/g, '_')}`;
        const authorImgBuffer = Buffer.from(await authorImgFile.arrayBuffer());
        const authorUploadDir = path.join(publicDir, "uploads", "authors");
        await mkdir(authorUploadDir, { recursive: true });
        await writeFile(path.join(authorUploadDir, authorImgName), authorImgBuffer);
        finalAuthorImg = `/uploads/authors/${authorImgName}`;
    }

    // save to Mongo
    const blogData = {
      title,
      description,
      category,
      author,
      authorImg: finalAuthorImg,
      image: blogImgUrl,
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

export async function DELETE(request) {
    try {
        await ConnectDB();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: "Blog ID is required" }, { status: 400 });
        }

        await BlogModel.findByIdAndDelete(id);
        return NextResponse.json({ msg: "Blog Deleted Successfully!" });
    } catch (error) {
        console.error("DELETE API Error:", error);
        return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
    }
}


export async function PUT(request) {
    try {
        await ConnectDB();
        const formData = await request.formData();
        const id = formData.get("id");
        const title = formData.get("title");
        const description = formData.get("description");
        const category = formData.get("category");
        const author = formData.get("author");
        const authorImg = formData.get("authorImg");
        const image = formData.get("image"); // This could be a file or a string URL
        const authorImgFile = formData.get("authorImgFile");

        if (!id) return NextResponse.json({ error: "Blog ID is required" }, { status: 400 });

        const blog = await BlogModel.findById(id);
        if (!blog) return NextResponse.json({ error: "Blog not found" }, { status: 404 });

        const updateData = { title, description, category, author };

        // Handle Thumbnail Update
        if (image && typeof image !== "string") {
            const timestamp = Date.now();
            const blogImgName = `${timestamp}_${image.name.replace(/\s+/g, '_')}`;
            const blogImgBuffer = Buffer.from(await image.arrayBuffer());
            const publicDir = path.join(process.cwd(), "public");
            const blogUploadDir = path.join(publicDir, "uploads", "blogs");
            await mkdir(blogUploadDir, { recursive: true });
            await writeFile(path.join(blogUploadDir, blogImgName), blogImgBuffer);
            updateData.image = `/uploads/blogs/${blogImgName}`;
        }

        // Handle Author Image Update
        if (authorImgFile && typeof authorImgFile !== "string") {
            const timestamp = Date.now();
            const authorImgName = `${timestamp}_author_${authorImgFile.name.replace(/\s+/g, '_')}`;
            const authorImgBuffer = Buffer.from(await authorImgFile.arrayBuffer());
            const publicDir = path.join(process.cwd(), "public");
            const authorUploadDir = path.join(publicDir, "uploads", "authors");
            await mkdir(authorUploadDir, { recursive: true });
            await writeFile(path.join(authorUploadDir, authorImgName), authorImgBuffer);
            updateData.authorImg = `/uploads/authors/${authorImgName}`;
        } else if (authorImg) {
            updateData.authorImg = authorImg;
        }

        await BlogModel.findByIdAndUpdate(id, updateData);
        return NextResponse.json({ msg: "Blog Updated Successfully!" });
    } catch (error) {
        console.error("PUT API Error:", error);
        return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
    }
}
