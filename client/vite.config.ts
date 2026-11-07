import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

import path from 'path' 

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
   // port: 3000,
   port:5173,
   strictPort: true,
   hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 5173,
    },
   proxy: {
     "/api": {
       target: "https://insuraly.onrender.com",
       changeOrigin: true,
       rewrite: (path) => path.replace(/^\/api/, "/api"),
       secure: false,
     },
   },
 },
 resolve: {
   alias: {
     '@': path.resolve(__dirname, './src'),
   },
 },
})


// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react';
// import tailwindcss from '@tailwindcss/vite';

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(),tailwindcss()],
//   server: {
//    // port: 3000,
//    port:5173,
//    strictPort: true,
//    hmr: {
//       protocol: 'ws',
//       host: 'localhost',
//       port: 5173,
//     },
//    proxy: {
//      "/api": {
//        target: "http://localhost:3000",
//        changeOrigin: true,
//        rewrite: (path) => path.replace(/^\/api/, "/api"),
//        secure: false,
//      },
//    },
//  },
// })

