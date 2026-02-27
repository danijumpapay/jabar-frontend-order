import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    server: {
      headers: {
        "Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https://*.google.com https://*.openstreetmap.org https://*.tile.openstreetmap.org https://order.kangpajak.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://*.google.com https://*.openstreetmap.org https://*.kangpajak.com https://nominatim.openstreetmap.org; frame-src 'self'; object-src 'none'; base-uri 'self'; upgrade-insecure-requests; frame-ancestors 'none'; form-action 'self';",
        "X-Frame-Options": "DENY",
        "X-Content-Type-Options": "nosniff",
        "X-XSS-Protection": "1; mode=block",
        "Referrer-Policy": "strict-origin-when-cross-origin",
        "Permissions-Policy": "camera=(), microphone=(), geolocation=(self)",
        "X-Permitted-Cross-Domain-Policies": "none",
        "Cross-Origin-Resource-Policy": "same-site",
        "Access-Control-Allow-Origin": "http://localhost:5173"
      },
      proxy: {
        '/api': {
          target: env.VITE_SAMBARA_BASE_URL || 'https://integration.jumpapay.com/api/v1',
          changeOrigin: true,
          headers: {
            'Authorization': `Bearer ${env.SAMBARA_TOKEN}`
          },
          rewrite: (path: string) => path.replace(/^\/api\/get-vehicle-info/, '/sambara/info-pkb?isFake=true')
        }
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  }
})