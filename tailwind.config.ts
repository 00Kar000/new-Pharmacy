import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'Card': 'minmax(100px, 1fr) minmax(100px, 1fr) minmax(100px, 1fr) 30px 30px',
        'mobile': 'minmax(50px, 1fr) minmax(50px, 1fr) minmax(50px, 1fr) 5px 5px',
      }
    },
  },
  plugins: [
    require("tailwindcss-scrollbar"),
  ],
}
export default config
