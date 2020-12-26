import React from 'react';
import { authRoles } from 'app/auth';

const ChatAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.user,
	routes: [
		{
			path: '/apps/chat',
			component: React.lazy(() => import('./ChatApp'))
		}
	]
};

export default ChatAppConfig;
