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
				title: 'Schedules',
				translate: 'Schedules',
				type: 'item',
				icon: 'today',
				url: '/apps/calendar'
			},
			
		]
	},
	{
		id: 'users',
		title: 'Users',
		type: 'group',
		icon: 'web',
		children: [
			{
				id: 'coaches',
				title: 'Coaches',
				// translate: 'COACHES',
				type: 'item',
				icon: 'supervisor_account',
				url: '/coaches',
				exact: true
			},
			{
				id: 'players',
				title: 'Palyers',
				// translate: 'PLAYERS',
				type: 'item',
				icon: 'supervisor_account',
				url: '/players',
				exact: true
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
	{
		id: 'service',
		title: 'Services',
		type: 'group',
		icon: 'web',
		children: [
			{
				id: 'mail',
				title: 'Message',
				translate: 'Message',
				type: 'item',
				icon: 'email',
				url: '/messages',
				// badge: {
				// 	title: 25,
				// 	bg: '#F44336',
				// 	fg: '#FFFFFF'
				// }
			},
			{
				id: 'membership',
				title: 'Membership',
				translate: 'Membership',
				type: 'item',
				icon: 'email',
				url: '/membership',
				exact: true,
				auth: authRoles.onlyCoach,
			},
		]
	},
	{
		id: 'management',
		title: 'Management',
		type: 'group',
		icon: 'web',
		auth: authRoles.onlyAdmin,
		children: [
			{
				id: 'teams',
				title: 'Teams',
				translate: 'Teams',
				type: 'item',
				icon: 'supervisor_account',
				url: '/teams',
				exact: true
			},
			// {
			// 	id: 'games',
			// 	title: 'Games',
			// 	translate: 'Games',
			// 	type: 'item',
			// 	icon: 'supervisor_account',
			// 	url: '/games',
			// 	exact: true
			// },
			{
				id: 'SponsorshipAds',
				title: 'Sponsorship ads',
				translate: 'Sponsorship ads',
				type: 'item',
				icon: 'broken_image',
				url: '/sponsorship-ads',
				exact: true
			}
		]
	},
];

export default navigationConfig;
