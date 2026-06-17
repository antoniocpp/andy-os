import { NextRequest, NextResponse } from "next/server";
import { put, list } from "@vercel/blob";

const SECRET = process.env.ANDY_SNAPSHOT_SECRET ?? "";

export async function POST(req: NextRequest) {
  const auth = req.headers.get("authorization") ?? "";
  if (!auth.startsWith("Bearer ") || auth.slice(7) !== SECRET) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    const blob = await put("andy-snapshot.json", JSON.stringify(body), {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
    });
    return NextResponse.json({ ok: true, url: blob.url });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { blobs } = await list({ prefix: "andy-snapshot.json", limit: 1 });
    if (!blobs.length) return NextResponse.json({ error: "not found" }, { status: 404 });
    const res = await fetch(blobs[0].url, { cache: "no-store" });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
