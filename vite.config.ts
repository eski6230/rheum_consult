import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Custom plugin to remove importmap if it persists in index.html
const removeImportMap = () => ({
  name: 'remove-import-map',
  transformIndexHtml(html: string) {
    // Robust regex to find and remove script type="importmap" with any quoting/spacing/case
    // This acts as a safety net if the file reverts to using the active importmap
    return html.replace(/<script\s+type=["']importmap["']\s*>[\s\S]*?<\/script>/gi, '');
  }
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    // Add the removeImportMap plugin to the list
    plugins: [react(), removeImportMap()],
    define: {
      // This explicitly replaces 'process.env.API_KEY' in your code 
      // with the actual value from Vercel environment variables during build.
      'process.env.API_KEY': JSON.stringify(env.API_KEY || process.env.API_KEY)
    }
  };
});