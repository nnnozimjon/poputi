import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decryptToken } from "./utils";

const protectedRoutes = ["/profile", "/my-trips"];
const authRoutes = ["/auth", "/register"];
const forbiddenRoutes = ["/banking"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes?.includes(path);
  const isAuthRoute = authRoutes?.includes(path);
  const isForbiddenRoute = forbiddenRoutes?.includes(path);
  const token: string = cookies().get("access_token")?.value || "";
  const userDetails: any = await decryptToken(token);

  if (isAuthRoute && userDetails) {
    return NextResponse.redirect(new URL("/", req.nextUrl)); 
  }

  if (isProtectedRoute && !userDetails) {
    return NextResponse.redirect(new URL("/", req.nextUrl)); 
  }

  if (isForbiddenRoute && userDetails) {
    return NextResponse.redirect(new URL("/", req.nextUrl)); 
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
