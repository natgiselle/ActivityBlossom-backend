/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./public/index.html"
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                'retro': ['Press Start 2P', 'cursive'],
            },
            colors: {
                'neon': {
                    pink: '#ff6ec7',
                    blue: '#00f3ff',
                    purple: '#b300ff',
                },
            },
            boxShadow: {
                'neon': '0 0 5px theme(colors.neon.blue), 0 0 20px theme(colors.neon.blue)',
            },
        },
    },
    plugins: [],
} 