import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/api/:path*",
  "/sign-in(.*)",
  "/sign-up(.*)",
]);
export default clerkMiddleware((auth, req) => {
  if (!isPublicRoute) {
    auth().protect();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
