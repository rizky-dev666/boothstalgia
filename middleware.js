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

  // Di lingkungan Edge non-Next.js, kita tidak perlu memanggil 'next()'
  // Cukup kembalikan request yang sudah dimodifikasi atau biarkan Vercel melanjutkannya.
  // Namun, untuk memastikan header terpasang, kita lanjutkan dengan membuat 'Response' baru.
  // Dalam kasus ini, kita bisa membiarkannya undefined agar Vercel melanjutkan proses.
  return;
}
