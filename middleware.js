import { NextResponse } from "next/server";

export const config = {
  // Jalankan middleware untuk semua path kecuali file statis dan halaman maintenance itu sendiri
  matcher: "/((?!_next/static|_next/image|favicon.ico|maintenance.html).*)",
};

export default function middleware(request) {
  // Cek environment variable MAINTENANCE_MODE
  if (import.meta.env.MAINTENANCE_MODE === "true") {
    // Tambahkan header 'x-vercel-maintenance' ke permintaan
    request.headers.set("x-vercel-maintenance", "1");
  }

  // Lanjutkan ke tujuan berikutnya dengan header yang sudah dimodifikasi
  return NextResponse.next({
    request: {
      headers: new Headers(request.headers),
    },
  });
}
