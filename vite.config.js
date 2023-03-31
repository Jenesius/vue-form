import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite';
import { resolve } from 'node:path'
import pkg from './package.json'
import typescript from '@rollup/plugin-typescript';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
const NAME = pkg.name;
const VERSION = pkg.version;

const banner = `/*!
  * ${NAME} v${VERSION}
  * (c) ${new Date().getFullYear()} Jenesius
  * @license MIT
  */`
export default defineConfig({
    plugins: [
        {
           ...typescript({ tsconfig: resolve("plugin", "tsconfig.json"),  }),
            apply: 'build'
        },
        cssInjectedByJsPlugin(),
        vue(),

    ],
    build: {

        outDir: resolve( "dist"),
        lib: {
            entry: resolve(__dirname,"plugin", "index.ts"),
            name: "JenesiusVueForm",
            formats: [`cjs`, 'umd', 'es'],

        },
        rollupOptions: {
            external: [...Object.keys(pkg.peerDependencies)],
            output: {
                globals: {
                    vue: 'Vue',
                },
                sourcemap: true,
                banner
            }
        },

    }
})