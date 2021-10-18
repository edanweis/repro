import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'
import ViteComponents, { VuetifyResolver } from 'vite-plugin-components';
import VitePluginCdn from 'vite-plugin-cdn';


import path from 'path';

export default defineConfig({
  server: {
      port: 8080
    },
  optimizeDeps: {
     
   },
  build: {
     chunkSizeWarningLimit: 700, // Default is 500
   },
  resolve: {
     alias: [
       {
         find: '@',
         replacement: ('/src')
       },
       { 
        find: /~(.+)/,
        replacement: path.join(process.cwd(), 'node_modules/$1'),
      },
       
     ]
   },
  plugins: [
    createVuePlugin(),
    ViteComponents({
      customComponentResolvers: [VuetifyResolver()]
    }),
  ],
})