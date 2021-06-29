import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'
import ViteComponents, { VuetifyResolver } from 'vite-plugin-components';
import VitePluginCdn from 'vite-plugin-cdn';
import vitePluginVue2CssVars from "vite-plugin-vue2-css-vars";


import path from 'path';

export default defineConfig({
  server: {
      port: 8080
    },
  optimizeDeps: {
     include: ['rebound/rebound.js']
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
    vitePluginVue2CssVars(),
    createVuePlugin(),
    ViteComponents({
      customComponentResolvers: [VuetifyResolver()]
    }),
  ],
})