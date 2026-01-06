import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    //     VitePWA({
    //   workbox: {
    //     runtimeCaching: [
    //       {
    //         urlPattern: ({ url }) =>
    //           url.pathname.startsWith('/api/'),
    //         handler: 'NetworkFirst',
    //         options: {
    //           cacheName: 'api-cache',
    //           expiration: {
    //             maxEntries: 100,
    //             maxAgeSeconds: 60 * 60 * 24
    //           }
    //         }
    //       },
    //       {
    //         urlPattern: ({ request }) =>
    //           request.destination === 'image',
    //         handler: 'CacheFirst',
    //         options: {
    //           cacheName: 'images-cache',
    //           expiration: {
    //             maxEntries: 200
    //           }
    //         }
    //       }
    //     ]
    //   }
    // })
  ],
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.').at(-1);
          if (/css/i.test(extType)) {
            return `assets/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js'
      }
    },
    cssCodeSplit: true
  }
})
