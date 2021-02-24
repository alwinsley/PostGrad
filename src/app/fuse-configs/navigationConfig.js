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
		id: 'analytics-dashboard',
		title: 'Home',
		translate: 'Home',
		icon: 'dashboard',
		type: 'item',
		url: '/apps/dashboards/home'
	},
	{
		id: 'coaches',
		title: 'Coaches',
		translate: 'Coaches',
		type: 'item',
		icon: 'people',
		url: '/coaches',
		exact: true
	},
	{
		id: 'players',
		title: 'Players',
		translate: 'Players',
		type: 'item',
		icon: 'supervisor_account',
		url: '/players',
		exact: true
	},
	{
		id: 'mail',
		title: 'Messages',
		translate: 'Messages',
		type: 'item',
		icon: 'email',
		url: '/messages',
	},
	{
		id: 'membership',
		title: 'Membership',
		translate: 'Membership',
		type: 'item',
		icon: 'card_membership',
		url: '/membership',
		exact: true,
		auth: authRoles.onlyPlayer,
	},
	{
		id: 'recruiting_board',
		title: 'Recruiting Board',
		translate: 'Recruiting Board',
		type: 'item',
		icon: 'favorite_border',
		url: '/recruiting_board',
		exact: true,
		auth: authRoles.onlyCoach,
	},
	{
		id: 'News',
		title: 'News',
		translate: 'News',
		type: 'item',
		icon: 'broken_image',
		url: '/news',
		exact: true
	},
	{
		id: 'management',
		title: 'Management',
		type: 'group',
		icon: 'web',
		auth: authRoles.onlyAdmin,
		children: [
			// {
			// 	id: 'teams',
			// 	title: 'Teams',
			// 	translate: 'Teams',
			// 	type: 'item',
			// 	icon: 'supervisor_account',
			// 	url: '/teams',
			// 	exact: true
			// },
			{
				id: 'games',
				title: 'Games',
				translate: 'Games',
				type: 'item',
				icon: 'supervisor_account',
				url: '/games',
				exact: true
			},
			{
				id: 'schedules',
				title: 'Schedules',
				translate: 'Schedules',
				type: 'item',
				icon: 'event',
				url: '/schedules',
				exact: true
			},
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
