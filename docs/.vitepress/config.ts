import { defineConfig } from 'vitepress'

export default defineConfig({
	title: 'Jenesius VueForm',
	description: "Form system for Vue.",
	
	themeConfig: {
		nav: nav(),
		sidebar: sidebar(),
		logo: './../images/logo.svg',
	}
})

function nav() {
	return [
		{ text: 'Guide', link: '/guide/installation', activeMatch: '/guide/' },
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
			]
		},
		{
			text: 'Form',
			items: [
				{ text: 'State', link: '/guide/form-state' },
				{ text: 'Methods', link: '/guide/form-methods' },
			]
		}
	]
}
