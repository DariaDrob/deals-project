import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    base: '/',
    server: {
        host: '127.0.0.1',
        port: 8080,
        watch: {
            ignored: ['**/favicon.ico'],
        },
    },
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: 'index.html',
        },
    },
    resolve: {
        alias: {
            '@': '/src',
        },
    },
});