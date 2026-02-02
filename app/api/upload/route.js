import { writeFile, mkdir } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

export async function POST(request) {
    try {
        const formData = await request.formData();
        const image = formData.get("image");

        if (!image || typeof image === "string") {
            return NextResponse.json({ error: "No image file provided" }, { status: 400 });
        }

        const timestamp = Date.now();
        const imageName = `${timestamp}_${image.name.replace(/\s+/g, '_')}`;
        const imageBuffer = Buffer.from(await image.arrayBuffer());
        
        const publicDir = path.join(process.cwd(), "public");
        const uploadDir = path.join(publicDir, "uploads", "description");
        
        // Ensure directory exists
        await mkdir(uploadDir, { recursive: true });
        
        await writeFile(path.join(uploadDir, imageName), imageBuffer);
        
        const imageUrl = `/uploads/description/${imageName}`;

        return NextResponse.json({ 
            msg: "Image uploaded successfully!", 
            url: imageUrl 
        });
    } catch (err) {
        console.error("Upload Error:", err);
        return NextResponse.json({ error: "Server Error during upload" }, { status: 500 });
    }
}
