/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./*.{jsx,js,html}",
        "./src/**/*.{jsx,js,html}",
    ],
    theme: {
        extend: {
            fontFamily: {
                'Merriweather': ['Merriweather', 'serif'],
                'Lato': ['Lato', 'sans-serif'],
            },
        },
    },
    plugins: [],
};