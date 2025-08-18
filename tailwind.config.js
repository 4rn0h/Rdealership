/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)", /* gold-20 */
        input: "var(--color-input)", /* elevated-dark-gray */
        ring: "var(--color-ring)", /* refined-gold */
        background: "var(--color-background)", /* deep-charcoal */
        foreground: "var(--color-foreground)", /* off-white */
        primary: {
          DEFAULT: "var(--color-primary)", /* deep-red */
          foreground: "var(--color-primary-foreground)", /* off-white */
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", /* rich-black */
          foreground: "var(--color-secondary-foreground)", /* off-white */
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", /* crimson-red */
          foreground: "var(--color-destructive-foreground)", /* off-white */
        },
        muted: {
          DEFAULT: "var(--color-muted)", /* elevated-dark-gray */
          foreground: "var(--color-muted-foreground)", /* medium-gray */
        },
        accent: {
          DEFAULT: "var(--color-accent)", /* refined-gold */
          foreground: "var(--color-accent-foreground)", /* deep-charcoal */
        },
        popover: {
          DEFAULT: "var(--color-popover)", /* rich-black */
          foreground: "var(--color-popover-foreground)", /* off-white */
        },
        card: {
          DEFAULT: "var(--color-card)", /* elevated-dark-gray */
          foreground: "var(--color-card-foreground)", /* off-white */
        },
        success: {
          DEFAULT: "var(--color-success)", /* forest-green */
          foreground: "var(--color-success-foreground)", /* off-white */
        },
        warning: {
          DEFAULT: "var(--color-warning)", /* sophisticated-orange */
          foreground: "var(--color-warning-foreground)", /* deep-charcoal */
        },
        error: {
          DEFAULT: "var(--color-error)", /* crimson-red */
          foreground: "var(--color-error-foreground)", /* off-white */
        },
      },
      fontFamily: {
        'heading': ['Playfair Display', 'serif'],
        'body': ['Inter', 'sans-serif'],
        'caption': ['Source Sans Pro', 'sans-serif'],
        'data': ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "slide-out-right": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "slide-in-right": "slide-in-right 0.3s ease-out",
        "slide-out-right": "slide-out-right 0.3s ease-out",
      },
      boxShadow: {
        'luxury-subtle': '0 2px 4px rgba(139, 0, 0, 0.1)',
        'luxury-medium': '0 4px 12px rgba(139, 0, 0, 0.1)',
        'luxury-prominent': '0 8px 24px rgba(139, 0, 0, 0.1)',
      },
      backgroundImage: {
        'luxury-gradient': 'linear-gradient(135deg, #8B0000 0%, #B8860B 100%)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}