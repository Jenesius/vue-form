

export default {
	title: 'JenesiusVueForm',
	description: "Form system for Vue.",
	
	themeConfig: {
		nav: nav(),
		sidebar: sidebar(),
		logo: './../images/logo.svg',
		socialLinks: [
			{ icon: 'github', link: 'https://github.com/Jenesius/vue-form' },
		]
	},
	
}

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
				{ text: 'Configuration', link: '/guide/configuration' }
			]
		},
		{
			text: 'Form',
			items: [
				{ text: 'State', link: '/guide/form-state' },
				{ text: 'Methods', link: '/guide/form-methods' },
				{ text: 'Events', link: '/guide/form-events' },
			]
		},

		{
			text: 'Inputs',
			items: [
				{
					text: 'Widgets', link: '/guide/input-widgets'
				}
			]
		}
	]
}
