import i18next from 'i18next';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { authRoles } from 'app/auth';
import ar from './i18n/ar';
import en from './i18n/en';
import tr from './i18n/tr';

i18next.addResourceBundle('en', 'mailApp', en);
i18next.addResourceBundle('tr', 'mailApp', tr);
i18next.addResourceBundle('ar', 'mailApp', ar);

const MailAppConfig = {
	settings: {
		layout: {}
	},
	auth: authRoles.notGuest,
	routes: [
		{
			path: [
				'/messages/label/:labelHandle/:mailId?',
				'/messages/filter/:filterHandle/:mailId?',
				'/messages/:folderHandle/:mailId?'
			],
			component: React.lazy(() => import('./MailApp'))
		},
		{
			path: '/messages',
			component: () => <Redirect to="/messages/inbox" />
		}
	]
};

export default MailAppConfig;
