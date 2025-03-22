import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decryptToken } from "./utils";

const protectedRoutes = ["/profile", "/trips"];
const authRoutes = ["/auth", "/register"]; // Add auth and register routes here

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes?.includes(path);
  const isAuthRoute = authRoutes?.includes(path);

  const token: string = cookies().get("access_token")?.value || "";
  const userDetails: any = await decryptToken(token);

  // Case: Redirect logged-in users from auth and register pages
  if (isAuthRoute && userDetails) {
    return NextResponse.redirect(new URL("/", req.nextUrl)); // Redirect to index if logged in
  }

  // Case: Protected routes, check for authenticated user
  if (isProtectedRoute && !userDetails) {
    return NextResponse.redirect(new URL("/", req.nextUrl)); // Redirect to index if not authenticated
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
