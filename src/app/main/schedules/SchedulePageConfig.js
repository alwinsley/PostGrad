import React from 'react';
import { authRoles } from 'app/auth';

const SchedulePageConfig = {
	settings: {
		layout: {}
	},
	auth: authRoles.onlyAdmin,
	routes: [
		{
			path: '/schedules',
			component: React.lazy(() => import('./ScheduleList'))
		}
	]
};

export default SchedulePageConfig;
