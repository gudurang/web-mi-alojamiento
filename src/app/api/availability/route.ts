import { NextRequest, NextResponse } from "next/server";
import { getBookedRanges } from "@/lib/availability";
import type { RoomKey } from "@/lib/pricing";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const VALID: RoomKey[] = ["serrana", "mirador", "alcoba", "casa"];

export async function GET(req: NextRequest) {
  const room = req.nextUrl.searchParams.get("room") as RoomKey | null;
  if (!room || !VALID.includes(room)) {
    return NextResponse.json({ ranges: [] });
  }
  try {
    const ranges = await getBookedRanges(room);
    return NextResponse.json({ ranges });
  } catch (e) {
    console.error("availability error", e);
    return NextResponse.json({ ranges: [] });
  }
}
