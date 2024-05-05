import { clerkMiddleware , createRouteMatcher} from "@clerk/nextjs/server";
import { authMiddleware } from "@clerk/nextjs/server";
import { auth } from "@clerk/nextjs/server";
const protectedRoutes=createRouteMatcher([
    '/',
    '/upcoming',
    '/previous',
    '/recordings',
    '/meeting(.*)'
])

export default clerkMiddleware((auth, req)=>{
    if(protectedRoutes(req)) auth().protect();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};