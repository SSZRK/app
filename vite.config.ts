import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig({
    clearScreen: false,
    server: {
        strictPort: true,
        port: 5173,
    },
    envPrefix: ['VITE_', 'TAURI_ENV_*'],
    plugins: [react()],
})
