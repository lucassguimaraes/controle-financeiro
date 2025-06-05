
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on mode (development, production)
  // Loads .env variables into process.env
  const env = loadEnv(mode, '.', ''); 
  
  return {
    plugins: [react()],
    define: {
      // Make VITE_GEMINI_API_KEY from .env available as process.env.API_KEY in the app
      'process.env.API_KEY': JSON.stringify(env.VITE_GEMINI_API_KEY)
    }
  }
})