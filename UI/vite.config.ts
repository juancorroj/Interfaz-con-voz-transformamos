import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/Interfaz-con-voz-transformamos/' : '/',
  plugins: [react()],
  // Archify (carpeta hermana) importa React: se resuelve siempre desde esta copia para no duplicarlo.
  resolve: { dedupe: ['react', 'react-dom'] },
  server: {
    // El Dossier vive en la raíz del repositorio, un nivel por encima de UI/; la web lo lee bajo demanda.
    fs: { allow: ['..'] },
    port: 3000,
    open: false
  }
}));
