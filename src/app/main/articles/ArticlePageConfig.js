import React from 'react';
import { authRoles } from 'app/auth';

const ArticlePageConfig = {
	settings: {
		layout: {}
	},
	auth: authRoles.notGuest,
	routes: [
		{
			path: '/news',
			component: React.lazy(() => import('./ArticleList'))
		}
	]
};

export default ArticlePageConfig;
