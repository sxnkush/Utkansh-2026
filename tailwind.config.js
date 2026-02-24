/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                neonLime: "#ccff00",
            },
            fontFamily: {
                marker: ['"Permanent Marker"', "cursive"],
                dancing: ['"Dancing Script"', 'cursive'],
                chalk: ["'Gloria Hallelujah'", "cursive", "fantasy"],
            },
        },
    },
    plugins: [],
};