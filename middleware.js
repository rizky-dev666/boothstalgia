import { next } from "@vercel/edge";

export const config = {
  // Jalankan middleware untuk semua path kecuali file statis dan halaman maintenance itu sendiri
  matcher: "/((?!_next/static|_next/image|favicon.ico|maintenance.html).*)",
};

export default function middleware(request) {
  // Gunakan import.meta.env untuk mengakses Environment Variable di Edge runtime
  if (import.meta.env.MAINTENANCE_MODE === "true") {
    // Tambahkan header 'x-vercel-maintenance' ke permintaan
    // Ini akan memicu aturan rewrite di vercel.json
    request.headers.set("x-vercel-maintenance", "1");
  }

  // Lanjutkan ke tujuan berikutnya dengan header yang sudah dimodifikasi
  return next({
    request: {
      headers: new Headers(request.headers),
    },
  });
}
