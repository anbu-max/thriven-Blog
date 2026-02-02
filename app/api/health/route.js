import { NextResponse } from "next/server";
import ConnectDB from "@/lib/config/ConnectDB";

export async function GET() {
    try {
        await ConnectDB();
        return NextResponse.json({ status: "Connected", uri_prefix: process.env.MONGODB_URI?.substring(0, 15) });
    } catch (error) {
        return NextResponse.json({ status: "Error", message: error.message }, { status: 500 });
    }
}
