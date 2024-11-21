import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [react()],
    
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
    },

    server: {
      port: 3001,
      host: true,
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:9876',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path
        },
      },
    },

    build: {
      outDir: 'dist',
      sourcemap: command === 'serve',
      // Configure production build
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'ui-vendor': ['antd'],
          },
        },
      },
    },

    // Environment variables configuration
    define: {
      __DEV__: command === 'serve',
    },

    // Optimizations for development
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom', 'antd'],
    },
  }
})
