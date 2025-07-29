// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export function middleware(req: NextRequest) {
//   const token = req.cookies.get('REFRESH_TOKEN')?.value;

//   // 보호할 경로 설정
//   const protectedPaths = ['/profile', '/my', '/study', '/manager'];
//   const pathname = req.nextUrl.pathname;

//   const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

//   if (isProtected && !token) {
//     const loginUrl = req.nextUrl.clone();
//     loginUrl.pathname = '/auth/login';
//     return NextResponse.redirect(loginUrl);
//   }

//   return NextResponse.next();
// }

// // middleware가 적용될 경로 설정
// export const config = {
//   matcher: [
//     // 모든 경로에 대해 middleware 적용하되, 아래 제외 경로는 무시
//     '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
//   ],
// };
