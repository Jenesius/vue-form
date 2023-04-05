import {defineConfig} from "vitepress";

export default defineConfig({
	title: 'JenesiusVueForm',
	description: "Vue Form. Form system for Vue.",
	head: [
		['link', { rel: 'icon', href: `./../images/logo.png` }]
	],
	themeConfig: {

		nav: nav(),
		sidebar: sidebar(),
		logo: './../images/logo.svg',
		socialLinks: [
			{ icon: 'github', link: 'https://github.com/Jenesius/vue-form' },
		]
	},
	
})

function nav() {
	return [
		{ text: 'Guide', link: '/guide/installation', activeMatch: '/guide/' },
		{ text: 'Examples', link: '/examples/list', activeMatch: '/examples/' },
		{ text: 'Found mistake?', link: 'https://github.com/Jenesius/vue-form/issues/new?assignees=&labels=docs+report&template=documentation-mistake.md'},
	]
}
function sidebar() {
	return [
		{
			text: 'Guide',
			items: [
				{ text: 'Installation', link: '/guide/installation' },
				{ text: 'Getting started', link: '/guide/getting-started' },
				{ text: 'Form', link: '/guide/form' },
				{ text: 'FormProxy', link: '/guide/form-proxy' },
				{ text: 'Input', link: '/guide/input' },
				{ text: 'Configuration', link: '/guide/configuration' },
				{ text: 'Utils', link: '/guide/utils' },
			]
		},
		{
			text: 'Form',
			items: [
				{ text: 'State', link: '/guide/form-state' },
				{ text: 'Methods', link: '/guide/form-methods' },
				{ text: 'Events', link: '/guide/form-events' },
				{ text: "Reactivity", link: '/guide/form-reactivity' }
			]
		},

		{
			text: 'Inputs',
			items: [
				{ text: 'Widgets', link: '/guide/input-widgets' },
				{ text: 'Custom Widgets', link: '/guide/custom-widgets' },
				{ text: "Input File", link: "/guide/input-file" },
				{ text: "v-model", link: "/guide/model-value" },
				{ text: "Input Text", link: "/inputs/input-text"},
				{ text: "Input Select", link: "/inputs/input-select" }
			]
		},
		{
			text: "Best Practices",
			items: [
				{ text: "Depth information", link: "/guide/form-in-depth" },
				{ text: 'Converting Options', link: "/utils/convert-options-object" }
			]
		},

	]
}
