/*eslint-disable*/

import pkg from './package.json'
import vuePlugin from '@vitejs/plugin-vue'
import postcss from 'rollup-plugin-postcss';
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript';
import {getBabelOutputPlugin} from "@rollup/plugin-babel";
import changelog from "generate-changelog";
import fs from "fs";

const NAME = pkg.name;
const VERSION = pkg.version;

const banner = `/*!
  * ${NAME} v${VERSION}
  * (c) ${new Date().getFullYear()} Jenesius
  * @license MIT
  */`

const outputConfig = {
	cjs: {
		file: pkg.main,
		format: `cjs`,
	},
}



changelog.generate({ patch: true, repoUrl: /(.*)(\.git)/.exec(pkg.repository.url)[1] })
.then(function (changelog) {
	fs.writeFileSync('./CHANGELOG.md', changelog);
});

function createConfig(format, output) {
	if (!output) {
		process.exit(1)
	}
	
	output.banner = banner
	
	output.globals = {
		vue: 'Vue',
	}
	output.sourcemap = true;
	const isGlobalBuild = format === 'global'
	
	if (isGlobalBuild) output.name = 'JenesiusVueForm'
	
	const external = ['vue', 'jenesius-event-emitter', 'libphonenumber-js']
	
	return {
		input: "./plugin/index.ts",
		external,
		plugins: [
			typescript({ tsconfig: './plugin/tsconfig.json',  }),

			vuePlugin({
				isProduction: true
			}),

			commonjs(),
			postcss(),
			getBabelOutputPlugin({
				presets: ['@babel/preset-env']
			})
		],
		output,
	}
}


const packageConfigs = Object.keys(outputConfig).map(format =>
	createConfig(format, outputConfig[format])
)

export default [...packageConfigs];

