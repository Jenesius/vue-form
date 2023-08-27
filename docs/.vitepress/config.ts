import {defineConfig} from "vitepress";
import {labelStore} from "./language-store";

export default defineConfig({
	title: 'JenesiusVueForm',
	description: "Vue Form. Form system for Vue.",
	head: [
		['link', { rel: 'icon', href: `/logo.png` }]
	],
	sitemap: {
		hostname: "https://form.jenesius.com"
	},
	themeConfig: {
		nav: nav(),
		sidebar: sidebar(),
		logo: '/logo.svg',
		socialLinks: [
			{ icon: 'github', link: 'https://github.com/Jenesius/vue-form' },
		],
		footer: {
			message: "Released under the MIT License.",
			copyright: "Copyright © 2023-present Jenesius",
		},
	},
	locales: {
		root: {
			dir: "en",
			label: "English",
		},
		ru: {

			label: "Русский",
			lang: "ru",
			description: "Система форм для Vue",
			themeConfig: {
				nav: nav('ru'),
				sidebar: sidebar('ru'),
				outline: {
					label: "На этой странице",
				},
				docFooter: {
					prev: 'Предыдущая страница',
					next: 'Следующая страница',
				},
				sidebarMenuLabel: 'Меню',
				returnToTopLabel: 'Вернуться наверх',
				langMenuLabel: 'Изменить язык',
				darkModeSwitchLabel: 'Изменить тему'
			},

		},

	},


})

const defaultLang = 'en';
type Lang = 'ru' | 'en'



function nav(lang: Lang = defaultLang) {
	const getLink = getLinkHandler(lang);
	const getLabel = getLabelHandler(lang);
	return [
		{ text: getLabel('guide'), link: getLink('/guide/getting-started'), activeMatch: getLink('/guide/') },
		{ text: getLabel('examples'), link: getLink('/examples/list'), activeMatch: getLink('/examples/') },
		{ text: getLabel('found mistake?'), link: 'https://github.com/Jenesius/vue-form/issues/new?assignees=&labels=docs+report&template=documentation-mistake.md'},
	]
}
function sidebar(lang: Lang = defaultLang) {
	const getLink = getLinkHandler(lang);
	const getLabel = getLabelHandler(lang);

	function getInputPage(name: string) { return { text: name, link: getLink('/inputs/input-' + name) } }

	return [
		{
			text: getLabel('guide'),
			items: [
				{ text: getLabel('get started!'), link: getLink('/guide/getting-started') },
				{ text: getLabel('form'), link: getLink('/guide/form') },
				{ text: getLabel('working with values'), link: getLink('/guide/working-with-values') },
				{ text: getLabel('availability'), link: getLink('/guide/availability') },
				{ text: getLabel('validation'), link: getLink('/guide/validation') },
				{ text: getLabel('reactivity'), link: getLink('/guide/reactivity') },
				{ text: getLabel('configuration'), link: getLink('/guide/configuration') },
			]
		},
		{
		 text: getLabel('interface'),
			items: [
				{
					text: getLabel('built-in fields'),
					link: getLink('/fields/form-fields'),
					items: [
						getInputPage('checkbox'),
						getInputPage('date'),
						getInputPage('number'),
						getInputPage('password'),
						getInputPage('radio'),
						getInputPage('range'),
						getInputPage('select'),
						getInputPage('single-checkbox'),
						getInputPage('switch'),
						getInputPage('tel'),
						getInputPage('text'),
						getInputPage('textarea'),
					]
				},
				{ text: getLabel('using v-model'), link: getLink('/fields/model-value')},
				{ text: getLabel('overwrite and new fields'), link: getLink('/fields/new-fields') }
			]
		},
		{
			text: getLabel('for developers'),
			items: [
				{ text: getLabel('peculiarities'), link: getLink('/guide/peculiarities') },
				{ text: getLabel("tools"), link: getLink('/guide/utils') },
			]
		}
	]
}


function getLabelHandler(lang: Lang) {

	return function getLabel(label: keyof typeof labelStore) {
		function upper(str: string) {
			if (!str) return '---- -- -----'
			return str[0].toUpperCase() + str.slice(1);
		}
		if (lang === defaultLang) return upper(label);
		return upper(labelStore[label][lang])
	}
}
function getLinkHandler(lang: Lang) {
	return function getLink(link: string) {
		if (lang === defaultLang) return link;
		return [lang, link].join('/');
	}
}