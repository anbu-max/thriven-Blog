import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const formData = await request.formData();
        const image = formData.get("image");

        if (!image || typeof image === "string") {
            return NextResponse.json({ error: "No image file provided" }, { status: 400 });
        }

        const filename = `${Date.now()}_${image.name.replace(/\s+/g, '_')}`;
        
        // Upload to Vercel Blob
        const blob = await put(`description/${filename}`, image, {
            access: 'public',
        });

        return NextResponse.json({ 
            msg: "Image uploaded successfully!", 
            url: blob.url 
        });
    } catch (err) {
        console.error("Upload Error:", err);
        return NextResponse.json({ error: "Server Error during upload" }, { status: 500 });
    }
}
