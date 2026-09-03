import { NextResponse } from "next/server";
import { env } from "@/env";

export async function GET() {
  return NextResponse.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    environment: env.NODE_ENV,
    appName: env.NEXT_PUBLIC_APP_NAME,
  });
}
