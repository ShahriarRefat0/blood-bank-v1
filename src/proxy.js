import { NextResponse } from "next/server";


// This function can be marked `async` if using `await` inside
export function proxy(request) {
  const token = request.cookies.get("token")?.value

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// Alternatively, you can use a default export:
// export default function proxy(request) { ... }

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/profile/:path*", "/api/:path*", "/dashboard/:path*"]
};
