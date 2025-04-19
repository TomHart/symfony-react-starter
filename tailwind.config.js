const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: [
        './assets/**/*.{js,jsx,ts,tsx}', // Include all JS/TS files in the assets folder
        './templates/**/*.html.twig',   // Include Twig templates if applicable
    ],
    theme: {
        extend: {
            colors: {
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                card: 'hsl(var(--card))',
                'card-foreground': 'hsl(var(--card-foreground))',
                popover: 'hsl(var(--popover))',
                'popover-foreground': 'hsl(var(--popover-foreground))',
                primary: 'hsl(var(--primary))',
                'primary-foreground': 'hsl(var(--primary-foreground))',
                secondary: 'hsl(var(--secondary))',
                'secondary-foreground': 'hsl(var(--secondary-foreground))',
                muted: 'hsl(var(--muted))',
                'muted-foreground': 'hsl(var(--muted-foreground))',
                accent: 'hsl(var(--accent))',
                'accent-foreground': 'hsl(var(--accent-foreground))',
                destructive: 'hsl(var(--destructive))',
                'destructive-foreground': 'hsl(var(--destructive-foreground))',
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
            },
            borderRadius: {
                DEFAULT: 'var(--radius)',
            },
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
            },
        },
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
    },
    darkMode: 'class', // Enable dark mode using the "dark" class
    plugins: [],
};