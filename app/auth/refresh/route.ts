import { NextRequest, NextResponse } from "next/server";

import { clearAdminSession, refreshAdminSession } from "@/lib/supabase-auth";

const safeNextPath = (value: string | null) =>
  value?.startsWith("/") && !value.startsWith("//") ? value : "/painel";

export async function GET(request: NextRequest) {
  const next = safeNextPath(request.nextUrl.searchParams.get("next"));
  const admin = await refreshAdminSession();

  if (!admin) {
    await clearAdminSession();
    return NextResponse.redirect(new URL(`/login?next=${encodeURIComponent(next)}`, request.url));
  }

  return NextResponse.redirect(new URL(next, request.url));
}
