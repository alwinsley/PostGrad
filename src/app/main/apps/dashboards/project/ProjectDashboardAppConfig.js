import React from 'react';
import { authRoles } from 'app/auth';

const ProjectDashboardAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.notGuest,
	routes: [
		{
			path: '/apps/dashboards/project',
			component: React.lazy(() => import('./ProjectDashboardApp'))
		}
	]
};

export default ProjectDashboardAppConfig;
