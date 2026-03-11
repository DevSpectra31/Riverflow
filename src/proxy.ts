import { NextResponse, NextRequest } from 'next/server'
import getOrCreateDB from './models/server/dbSetup'
import getOrCreateStorage from './models/server/storage.collection'
// This function can be marked `async` if using `await` inside
export  async function proxy(request: NextRequest) {
    await Promise.all([
        getOrCreateDB(),
        getOrCreateStorage(),
    ])
    return NextResponse.next()
}
 
export const config = {
    /* match all the request path except the one that start with : 
    -api
    -_next/static
    -_next/images
    -favicon.com
    */
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}