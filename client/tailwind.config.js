/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        myColor1: "#1E2022",
        myColor2: "#52616B",
        myColor3: "#C9D6DF",
        myColor4: "#F0F5F9",
        myColor5: "#fbfbf2",
        
        // for online user myColor5
        myColor6: "#0D7C66",
      },
    },
  },
  plugins: [],
};
