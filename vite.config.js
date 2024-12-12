import { defineConfig } from "vite";
import mkcert from "vite-plugin-mkcert";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: true,
    host: true,
  },
  plugins: [mkcert()],
  input: {
    main: resolve(__dirname, "index.html"),
    nested: resolve(__dirname, "newpage.html"),
  },
});
