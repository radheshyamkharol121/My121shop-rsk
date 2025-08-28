// tailwind.config.js
// ------------------------------------------
// 🎨 Tailwind CSS का config file
// 👉 यहाँ पर हम specify करते हैं कि किन files में Tailwind classes use होंगी
// ------------------------------------------

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",      // HTML में भी tailwind classes check होगी
    "./src/**/*.{js,ts,jsx,tsx}",  // सभी React files (src folder के अंदर)
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",    // 🔵 Main brand color
        secondary: "#9333ea",  // 🟣 Secondary color
        accent: "#f59e0b",     // 🟠 Highlight color
      },
    },
  },
  plugins: [],
}