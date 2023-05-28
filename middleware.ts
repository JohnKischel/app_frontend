import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
 
export function middleware(request: NextRequest) {
  // Clone the request headers and set a new header `x-hello-from-middleware1`
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('Access-Control-Allow-Origin', '*');
  requestHeaders.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE');

  // You can also set request headers in NextResponse.rewrite

  const response = NextResponse.next({
    request: {
      // New request headers
      headers: requestHeaders,
    },
  });
  // Set a new response header `x-hello-from-middleware2`
  response.headers.set('Access-Control-Allow-Origin', '*');
    //allow all origins


  return response;
}