import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // Proteggiamo solo le rotte che iniziano con /admin
  if (req.nextUrl.pathname.startsWith("/admin")) {
    const authHeader = req.headers.get("authorization");

    if (authHeader) {
      // Decodifica le credenziali (formato: Basic base64(user:pass))
      const authValue = authHeader.split(" ")[1];
      const [user, pass] = Buffer.from(authValue, "base64")
        .toString()
        .split(":");

      // Confronta con le variabili d'ambiente
      if (user === process.env.ADMIN_USER && pass === process.env.ADMIN_PASS) {
        return NextResponse.next();
      }
    }

    // Se non autorizzato, forza il browser a mostrare il popup di login
    return new NextResponse("Area Protetta: Inserire Credenziali", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Area Riservata Petti Beverage"',
      },
    });
  }

  return NextResponse.next();
}

// Configura il middleware per attivarsi solo su /admin e sottocartelle
export const config = {
  matcher: "/admin/:path*",
};
