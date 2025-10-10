import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
    plugins: [
        react(),
    ],
    server: {
        port: 5173,
        // headers: {
        //     'Content-Security-Policy': "script-src 'self' 'unsafe-eval' https://client.crisp.chat https://www.googletagmanager.com https://*.web3auth.io https://browser.sentry-cdn.com https://js.sentry-cdn.com blob:",
        // },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    define: {
        global: 'globalThis',
    },
})