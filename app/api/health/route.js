import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
    try {
        const filePath = path.resolve(process.cwd(), "blogs_data.json");
        await fs.promises.access(filePath, fs.constants.R_OK | fs.constants.W_OK);
        return NextResponse.json({ status: "Connected", storage: "local_json" });
    } catch (error) {
        return NextResponse.json({ status: "Error", message: error.message }, { status: 500 });
    }
}

