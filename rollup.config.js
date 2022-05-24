/*eslint-disable*/

import pkg from './package.json'
import vuePlugin from 'rollup-plugin-vue';
import postcss from 'rollup-plugin-postcss';
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript';

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

function createConfig(format, output) {
	if (!output) {
		process.exit(1)
	}
	
	output.banner = banner
	
	output.globals = {
		vue: 'Vue',
	}
	
	const isGlobalBuild = format === 'global'
	
	if (isGlobalBuild) output.name = 'JenesiusVueForm'
	
	const external = ['vue', 'jenesius-event-emitter']
	
	return {
		input: "./plugin/index.ts",
		external,
		plugins: [
			typescript({ tsconfig: './plugin/tsconfig.json' }),
			/*
			vuePlugin({
				preprocessStyles: true
			}),
			commonjs(),
			postcss(),*/
		],
		output,
	}
}


const packageConfigs = Object.keys(outputConfig).map(format =>
	createConfig(format, outputConfig[format])
)

export default [...packageConfigs];

