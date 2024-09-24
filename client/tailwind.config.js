/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        
        // Theme - 1
        myColor1: "#1E2022",
        myColor2: "#52616B",
        myColor3: "#F0F5F9",
        myColor4: "#C9D6DF",
        myColor5: "#fbfbf2",
        
        // Theme - 2
        // myColor1: "#011627",
        // myColor2: "#3c6e71",
        // myColor3: "#d9d9d9",
        // myColor4: "#284b63",
        // myColor5: "#ffffff",
        
        // Optional Color ByDefault
        myColor6: "#0D7C66",
      },
    },
  },
  plugins: [],
};
