/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {},
        colors: {
            'primary-dark': '#48DE96',
            'primary-light': '#76FFBD',
            positive: '#305DFE',
            error: '#EE3131',
            'primary-45': '#454545',
            'primary-a6': '#A6A6A6',
            'white': '#ffffff'
        },
        fontSize: {
            28: '28px',
            20: '20px',
            16: '16px',
            13: '13px',
        },
    },
    plugins: [],
}
