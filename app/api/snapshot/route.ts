import { NextResponse } from "next/server";
import { put, head } from "@vercel/blob";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: Request) {
  const secret = process.env.ANDY_SNAPSHOT_SECRET;
  const auth = req.headers.get("authorization");

  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const blob = await put("andy-snapshot.json", JSON.stringify(body), {
    access: "public",
    addRandomSuffix: false,
    contentType: "application/json",
  });

  return NextResponse.json({ ok: true, url: blob.url });
}

export async function GET(req: Request) {
  const secret = process.env.ANDY_SNAPSHOT_SECRET;
  const auth = req.headers.get("authorization");

  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const info = await head("andy-snapshot.json", {
      token: process.env.BLOB_READ_WRITE_TOKEN!,
    });
    const res = await fetch(info.url);
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Snapshot not found" }, { status: 404 });
  }
}
