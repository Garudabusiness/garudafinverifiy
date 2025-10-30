import type { Config } from 'tailwindcss';
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#0052A3",      // Dark Blue (Garuda eagle & "Verify")
          secondary: "#00B4D8",    // Cyan (Garuda text)
          light: "#5BA3D0",        // Light Blue
          lighter: "#A8D8EA",      // Very Light Blue
          dark: "#003D7A",         // Darker Blue
        }
      }
    }
  },
  plugins: []
};
export default config;
