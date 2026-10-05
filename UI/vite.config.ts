import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/Interfaz-con-voz-transformamos/' : '/',
  plugins: [react()],
  // El motor Archify incluido en src/vendor comparte la instancia de React de la aplicación.
  resolve: { dedupe: ['react', 'react-dom'] },
  server: {
    port: 3000,
    open: false
  }
}));
