/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "booth-bg": "#FDF4E3", // Warna background utama (beige)
        "booth-brown": "#503C3C", // Warna kontainer utama (coklat tua)
        "booth-btn": "#EAD7B2", // Warna tombol (krem)
        "booth-btn-shadow": "#D4B483", // Warna bayangan/border tombol (emas)
        'booth-cream': '#EED6C4',
        'booth-beige': '#F3E9D2',
      },
      fontFamily: {
        // Ganti 'Gorditas' & 'Lilita One' dengan nama font Anda
        // Impor font ini di file `index.html` Anda dari Google Fonts
        title: ["Gorditas", "cursive"],
        display: ["Lilita One", "sans-serif"],
      },
      boxShadow: {
        "booth-container": "10px 10px 20px #00000040",
        "booth-button": "0 5px 0 0 #A08253", // Efek 3D untuk tombol
      },
      dropShadow: {
        "booth-title": "3px 3px 0 rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [],
};
