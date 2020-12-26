import { authRoles } from 'app/auth';
import i18next from 'i18next';

import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
	{
		id: 'main',
		title: 'mail',
		translate: 'MAIN',
		type: 'group',
		icon: 'apps',
		children: [
			{
				id: 'dashboards',
				title: 'Dashboards',
				translate: 'DASHBOARDS',
				type: 'collapse',
				icon: 'dashboard',
				children: [
					{
						id: 'analytics-dashboard',
						title: 'Analytics',
						type: 'item',
						url: '/apps/dashboards/analytics'
					},
					{
						id: 'project-dashboard',
						title: 'Project',
						type: 'item',
						url: '/apps/dashboards/project'
					}
				]
			},
			{
				id: 'calendar',
				title: 'Calendar',
				translate: 'CALENDAR',
				type: 'item',
				icon: 'today',
				url: '/apps/calendar'
			},
			
		]
	},
	{
		id: 'user-interface',
		title: 'Pages',
		type: 'group',
		icon: 'web',
		children: [
			{
				id: 'coaches',
				title: 'Coaches',
				// translate: 'COACHES',
				type: 'item',
				icon: 'shopping_cart',
				url: '/coaches',
				exact: true
			},
			{
				id: 'players',
				title: 'Palyers',
				// translate: 'PLAYERS',
				type: 'item',
				icon: 'shopping_cart',
				url: '/players',
				exact: true
			},
			{
				id: 'mail',
				title: 'Message',
				// translate: 'MAIL',
				type: 'item',
				icon: 'email',
				url: '/messages',
				badge: {
					title: 25,
					bg: '#F44336',
					fg: '#FFFFFF'
				}
			},
			// {
			// 	id: 'profile',
			// 	title: 'Profile',
			// 	type: 'item',
			// 	icon: 'person',
			// 	url: '/profile'
			// },
			// {
			// 	id: 'myprofile',
			// 	title: 'My Profile',
			// 	type: 'item',
			// 	icon: 'person',
			// 	url: '/my_profile'
			// },
		]
	},
];

export default navigationConfig;
