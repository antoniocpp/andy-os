import { NextResponse } from "next/server";
import { fetchActivity } from "@/lib/data";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const since = searchParams.get("since") ?? undefined;
  const entries = await fetchActivity(since);
  return NextResponse.json(entries);
}
