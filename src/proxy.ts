import { type NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const response = NextResponse.next();

  // Attach correlation ID to request/response headers for distributed tracing
  const correlationId =
    request.headers.get("x-correlation-id") ??
    `req_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  response.headers.set("x-correlation-id", correlationId);

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for static files:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public assets
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
