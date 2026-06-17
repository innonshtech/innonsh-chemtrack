import NextAuth from "next-auth"
import { authConfig } from "@/lib/auth.config"

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isOnDashboard = req.nextUrl.pathname.startsWith('/dashboard') || 
                        req.nextUrl.pathname.startsWith('/chemicals') ||
                        req.nextUrl.pathname.startsWith('/batches') ||
                        req.nextUrl.pathname.startsWith('/warehouse') ||
                        req.nextUrl.pathname.startsWith('/suppliers') ||
                        req.nextUrl.pathname.startsWith('/purchase-orders') ||
                        req.nextUrl.pathname.startsWith('/alerts') ||
                        req.nextUrl.pathname.startsWith('/reports') ||
                        req.nextUrl.pathname.startsWith('/settings');

  const isOnAuthPage = req.nextUrl.pathname.startsWith('/login') || req.nextUrl.pathname.startsWith('/register');

  if (isOnDashboard) {
    if (!isLoggedIn) return Response.redirect(new URL('/login', req.nextUrl))
    return null;
  }

  if (isOnAuthPage) {
    if (isLoggedIn) return Response.redirect(new URL('/dashboard', req.nextUrl))
    return null;
  }

  // Redirect root to dashboard if logged in, otherwise allow landing page
  if (req.nextUrl.pathname === '/') {
    if (isLoggedIn) return Response.redirect(new URL('/dashboard', req.nextUrl))
    return null;
  }

  return null;
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
