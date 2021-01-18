import React from 'react';
import { authRoles } from 'app/auth';

const TeamPageConfig = {
	settings: {
		layout: {}
	},
	auth: authRoles.onlyAdmin,
	routes: [
		{
			path: '/teams',
			component: React.lazy(() => import('./TeamList'))
		}
	]
};

export default TeamPageConfig;
