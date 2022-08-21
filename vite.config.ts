import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path, { resolve } from "path";
import typescript from '@rollup/plugin-typescript';

const resolvePath = (str: string) => path.resolve(__dirname, str);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  build: {
    lib: {
      // 打包的入口文件
      entry: resolve(__dirname, "src/index.tsx"),
      name: "react-pluggable-vx",
      fileName: 'index',
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      plugins: [
        typescript({
          target: "ESNext", // 这里指定编译到的版本，
          rootDir: resolvePath("src/"),
          declaration: true,
          declarationDir: resolvePath("dist"),
          exclude: resolvePath("node_modules/**"),
          allowSyntheticDefaultImports: true,
        }),
      ]
    },
  },
});