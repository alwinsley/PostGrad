import FuseUtils from '@fuse/utils';
import appsConfigs from 'app/main/apps/appsConfigs';
// import TeamPageConfig from 'app/main/teams/TeamPageConfig';
import GamePageConfig from 'app/main/games/GamePageConfig';
import SchedulePageConfig from 'app/main/schedules/SchedulePageConfig';
import UserPageConfig from 'app/main/users/UserPageConfig';
import MembershipConfig from 'app/main/memberships/MembershipConfig';
import SponsorshipConfig from 'app/main/sponsorships/SponsorShipConfig';
import FavoritesPageConfig from 'app/main/favorites/FavoritesPageConfig';
import ArticlePageConfig from 'app/main/articles/ArticlePageConfig';

import authRoleExamplesConfigs from 'app/main/auth/authRoleExamplesConfigs';
import LoginConfig from 'app/main/login/LoginConfig';
import LogoutConfig from 'app/main/logout/LogoutConfig';
import pagesConfigs from 'app/main/pages/pagesConfigs';
import RegisterConfig from 'app/main/register/RegisterConfig';

import React from 'react';
import { Redirect } from 'react-router-dom';

const routeConfigs = [
	...appsConfigs,
	...pagesConfigs,
	...authRoleExamplesConfigs,
	// TeamPageConfig,
	GamePageConfig,
	SchedulePageConfig,
	UserPageConfig,
	MembershipConfig,
	SponsorshipConfig,
	FavoritesPageConfig,
	ArticlePageConfig,
	
	LogoutConfig,
	LoginConfig,
	RegisterConfig,
	LogoutConfig
];

const routes = [
	// if you want to make whole app auth protected by default change defaultAuth for example:
	// ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin','staff','user']),
	// The individual route configs which has auth option won't be overridden.
	...FuseUtils.generateRoutesFromConfigs(routeConfigs, null),
	{
		path: '/',
		exact: true,
		component: () => <Redirect to="/apps/dashboards/home" />
	},
	{
		component: () => <Redirect to="/pages/errors/error-404" />
	}
];

export default routes;
