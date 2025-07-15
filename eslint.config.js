// eslint.config.js

import globals from "globals";
import js from "@eslint/js";
import react from "eslint-plugin-react"; // <-- Perubahan 1: Impor plugin react
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  {
    ignores: ["dist/"], // Abaikan folder dist
  },
  {
    files: ["**/*.{js,jsx}"],
    plugins: {
      react, // <-- Perubahan 2: Daftarkan plugin
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // --- Perubahan 3: Gunakan konfigurasi yang direkomendasikan ---
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules, // <-- Ini penting untuk React 17+
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": "warn",

      // Anda bisa tetap menggunakan aturan custom Anda jika perlu
      "react/prop-types": "off", // Nonaktifkan jika Anda tidak menggunakan PropTypes
      "no-unused-vars": [
        "warn", // Ubah ke 'warn' agar tidak menghentikan aplikasi saat development
        { varsIgnorePattern: "^[A-Z_]" },
      ],
    },
    // --- Perubahan 4: Tambahkan pengaturan untuk versi React ---
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
