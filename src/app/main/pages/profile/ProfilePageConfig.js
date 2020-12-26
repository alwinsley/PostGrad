import React from 'react';
import { Redirect } from 'react-router-dom';
import { authRoles } from 'app/auth';

const ProfilePageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.notGuest,
	routes: [
		{
			path: '/my_profile',
			component: React.lazy(() => import('./MyProfilePage'))
		},
		{
			path: '/profile/:id?',
			component: React.lazy(() => import('./ProfilePage'))
		},
		{
			path: '/profile',
			component: () => <Redirect to="/profile" />
		}
	]
};

export default ProfilePageConfig;
