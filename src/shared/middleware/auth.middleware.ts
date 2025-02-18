import { NextRequest, NextResponse } from "next/server";

export function authMiddleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;

  // Rutas protegidas
  const protectedRoutes = ["/dashboard"];

  if (protectedRoutes.includes(req.nextUrl.pathname) && !token) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  return NextResponse.next();
}

// 📌 Exportamos la configuración del matcher
export const config = {
  matcher: ["/dashboard/:path*"],
};
