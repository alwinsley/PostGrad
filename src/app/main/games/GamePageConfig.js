import React from 'react';
import { authRoles } from 'app/auth';

const GamePageConfig = {
	settings: {
		layout: {}
	},
	auth: authRoles.onlyAdmin,
	routes: [
		{
			path: '/games',
			component: React.lazy(() => import('./GameList'))
		}
	]
};

export default GamePageConfig;
