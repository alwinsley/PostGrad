import React from 'react';
import { authRoles } from 'app/auth';

const MembershipConfig = {
	settings: {
		layout: {}
	},
	auth: authRoles.onlyPlayer,
	routes: [
		{
			path: '/membership',
			component: React.lazy(() => import('./Membership'))
		}
	]
};

export default MembershipConfig;
