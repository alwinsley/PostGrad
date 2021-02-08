import React from 'react';
import { authRoles } from 'app/auth';

const FavoritesPageConfig = {
	settings: {
		layout: {}
	},
	auth: authRoles.onlyCoach,
	routes: [
		{
			path: '/favorites',
			component: React.lazy(() => import('./Favorites'))
		}
	]
};

export default FavoritesPageConfig;
