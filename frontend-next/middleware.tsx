import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    // localStorage is not available on the server side, use cookies or headers instead
    const accessToken = req.cookies.get("access"); // Assuming access token is stored in cookies

    const url = req.nextUrl.pathname;

    if (!accessToken && (url.includes("/dashboard") || url.includes("/table") || url.includes("/money"))) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
}
