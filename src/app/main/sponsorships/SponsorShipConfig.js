import React from 'react';
import { authRoles } from 'app/auth';

const SponsorShipConfig = {
	settings: {
		layout: {}
	},
	auth: authRoles.notGuest,
	routes: [
		{
			path: '/sponsorship-ads',
			component: React.lazy(() => import('./SponsorshipList'))
		}
	]
};

export default SponsorShipConfig;
