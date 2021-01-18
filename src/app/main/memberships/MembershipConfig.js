import React from 'react';
import { authRoles } from 'app/auth';

const MembershipConfig = {
	settings: {
		layout: {}
	},
	auth: authRoles.notGuest,
	routes: [
		{
			path: '/membership',
			component: React.lazy(() => import('./MembershipList'))
		}
	]
};

export default MembershipConfig;
