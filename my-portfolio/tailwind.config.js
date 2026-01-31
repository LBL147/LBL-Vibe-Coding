/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "bg-dark": "#0f172a",
        primary: "#6366f1",
        "text-main": "#f8fafc",
        "text-muted": "#94a3b8",
      },
      boxShadow: {
        card: "0 20px 45px rgba(15, 23, 42, 0.25)",
      },
    },
  },
  plugins: [],
};
