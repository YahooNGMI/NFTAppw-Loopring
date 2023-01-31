import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import nodePolyfills from "vite-plugin-node-stdlib-browser";
import { Buffer } from 'buffer';

 

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(),nodePolyfills(),],
  define: {global: 'window','process.env.ANCHOR_BROWSER': true,'Buffer.from':Buffer}, 
  resolve: {
    alias: {
      process: "process/browser"
    }
  },

  
})
