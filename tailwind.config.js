export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: { display: ['Inter', 'sans-serif'] },
      colors: {
        brand:    '#1A56DB',
        'brand-dark': '#1E429F',
        accent:   '#F97316',
        surface:  '#0F172A',
        'surface-2': '#1E293B',
        'surface-3': '#334155',
      }
    }
  },
  plugins: []
}
