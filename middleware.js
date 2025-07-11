export const config = {
  // Jalankan middleware untuk semua path kecuali file statis dan halaman maintenance itu sendiri
  matcher: "/((?!_next/static|_next/image|favicon.ico|maintenance.html).*)",
};

export default async function middleware(request) {
  // Jika mode maintenance TIDAK aktif, langsung lanjutkan.
  if (import.meta.env.MAINTENANCE_MODE !== "true") {
    return;
  }

  // Langsung ambil dan tampilkan halaman maintenance
  // Tanpa try...catch untuk menyederhanakan kode dan menghindari masalah linting.
  const maintenanceUrl = new URL("/maintenance.html", request.url);
  const maintenancePage = await fetch(maintenanceUrl);

  return new Response(maintenancePage.body, {
    status: 503,
    statusText: "Service Unavailable",
    headers: {
      "Content-Type": "text/html",
    },
  });
}
