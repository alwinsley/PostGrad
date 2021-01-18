import React from 'react';
import { authRoles } from 'app/auth';

const SecurityPageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.notGuest,
	routes: [
		{
			path: '/security',
			component: React.lazy(() => import('./SecurityPage'))
		}
	]
};

export default SecurityPageConfig;
