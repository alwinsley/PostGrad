import React from 'react';
import { authRoles } from 'app/auth';

const UserPageConfig = {
	settings: {
		layout: {}
	},
	auth: authRoles.notGuest,
	routes: [
		{
			path: '/coaches',
			component: React.lazy(() => import('./CoachList'))
		},
		{
			path: '/players',
			component: React.lazy(() => import('./PlayerList'))
		}
	]
};

export default UserPageConfig;
