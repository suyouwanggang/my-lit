import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import minifyHTML from 'rollup-plugin-minify-html-literals';

// https://vitejs.dev/config/
export default defineConfig({
  base:'./',
  plugins: [vue(),minifyHTML()],
  build:{
    manifest:true
  }
})
