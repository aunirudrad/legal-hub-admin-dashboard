module.exports = {
    darkMode: 'class',                 // <-- add this line
    content: ["./index.html", "./src/**/*.{js,jsx}"],
    theme: {
        extend: {
            colors: {
                brand: {
                    50: "#f8fbff",
                    100: "#eef6ff",
                    300: "#90b6ff",
                    500: "#3b82f6",
                    700: "#1e4bb8"
                }
            },
            boxShadow: {
                'lg-soft': '0 8px 30px rgba(16,24,40,0.06)'
            },
            keyframes: {
                float: {
                    '0%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-6px)' },
                    '100%': { transform: 'translateY(0px)' }
                },
                'fade-slide': {
                    '0%': { opacity: '0', transform: 'translateY(6px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' }
                }
            },
            animation: {
                float: 'float 4s ease-in-out infinite',
                'fade-slide': 'fade-slide 400ms ease-out both'
            }
        }
    },
    plugins: [],
};
  