import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.resolve(process.cwd(), "blogs_data.json");

async function readBlogsFile() {
  try {
    const fileContent = await fs.promises.readFile(filePath, "utf16le");
    const cleanContent = fileContent.replace(/^\ufeff/, "");
    const data = JSON.parse(cleanContent);
    return data.blogs || [];
  } catch (error) {
    console.error("Error reading blogs file:", error);
    return [];
  }
}

async function writeBlogsFile(blogs) {
  const contentToWrite = "\ufeff" + JSON.stringify({ blogs }, null, 2);
  await fs.promises.writeFile(filePath, contentToWrite, "utf16le");
}

const generateHexId = () => {
  return Array.from({ length: 24 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
};

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const blogs = await readBlogsFile();

    if (id) {
        const blog = blogs.find(b => String(b._id) === String(id));
        if (!blog) {
            return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        }
        return NextResponse.json(blog);
    }

    return NextResponse.json({ blogs });
  } catch (error) {
    console.error("GET API Error:", error);
    return NextResponse.json({ blogs: [], error: "Server Error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const category = formData.get("category");
    const author = formData.get("author");
    const image = formData.get("image");

    if (!title || !description || !category || !author) {
        return NextResponse.json({ error: "Missing required fields (Title, Description, Category, or Author)" }, { status: 400 });
    }

    if (!image || typeof image === "string") {
      return NextResponse.json({ error: "Blog image file is required" }, { status: 400 });
    }

    // Upload Blog Image to Vercel Blob
    const blogImgFilename = `${Date.now()}_${image.name.replace(/\s+/g, '_')}`;
    const blob = await put(`blogs/${blogImgFilename}`, image, {
        access: 'public',
    });
    const blogImgUrl = blob.url;

    // save locally
    const blogs = await readBlogsFile();
    const newBlog = {
      _id: generateHexId(),
      title,
      description,
      category,
      author,
      image: blogImgUrl,
      date: new Date().toISOString(),
    };
    
    blogs.push(newBlog);
    await writeBlogsFile(blogs);

    return NextResponse.json({ msg: "Blog Published Successfully!", blog: newBlog });
  } catch (err) {
    console.error("POST API Error:", err);
    return NextResponse.json({ error: `Server Error: ${err.message}` }, { status: 500 });
  }
}

export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: "Blog ID is required" }, { status: 400 });
        }

        const blogs = await readBlogsFile();
        const initialLength = blogs.length;
        const filteredBlogs = blogs.filter(b => String(b._id) !== String(id));

        if (filteredBlogs.length === initialLength) {
            return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        }

        await writeBlogsFile(filteredBlogs);
        return NextResponse.json({ msg: "Blog Deleted Successfully!" });
    } catch (error) {
        console.error("DELETE API Error:", error);
        return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
    }
}


export async function PUT(request) {
    try {
        const formData = await request.formData();
        const id = formData.get("id");
        const title = formData.get("title");
        const description = formData.get("description");
        const category = formData.get("category");
        const author = formData.get("author");
        const image = formData.get("image"); 

        if (!id) return NextResponse.json({ error: "Blog ID is required" }, { status: 400 });

        const blogs = await readBlogsFile();
        const blogIndex = blogs.findIndex(b => String(b._id) === String(id));
        if (blogIndex === -1) return NextResponse.json({ error: "Blog not found" }, { status: 404 });

        const blog = blogs[blogIndex];
        const updateData = {
          ...blog,
          title: title || blog.title,
          description: description || blog.description,
          category: category || blog.category,
          author: author || blog.author,
        };

        // Handle Thumbnail Update
        if (image && typeof image !== "string") {
            const blogImgFilename = `${Date.now()}_${image.name.replace(/\s+/g, '_')}`;
            const blob = await put(`blogs/${blogImgFilename}`, image, {
                access: 'public',
            });
            updateData.image = blob.url;
        }

        blogs[blogIndex] = updateData;
        await writeBlogsFile(blogs);

        return NextResponse.json({ msg: "Blog Updated Successfully!" });
    } catch (error) {
        console.error("PUT API Error:", error);
        return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
    }
}

