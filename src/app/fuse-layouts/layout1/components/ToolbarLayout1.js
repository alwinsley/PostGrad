import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import FuseSearch from '@fuse/core/FuseSearch';
import FuseShortcuts from '@fuse/core/FuseShortcuts';

import {
	AppBar,
	Hidden,
	Toolbar,
	Badge,
	Icon,
	IconButton
} from '@material-ui/core';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import NavbarMobileToggleButton from 'app/fuse-layouts/shared-components/NavbarMobileToggleButton';
import UserMenu from 'app/fuse-layouts/shared-components/UserMenu';


import { selectToolbarTheme } from 'app/store/fuse/settingsSlice';
import FullScreenToggle from '../../shared-components/FullScreenToggle';
import LanguageSwitcher from '../../shared-components/LanguageSwitcher';

import { checkMessage } from '../../../services/messageService';

const useStyles = makeStyles(theme => ({
	root: {}
}));

const ToolbarLayout1 = (props) => {
	const [notification, setNotification] = useState(0);
	const config = useSelector(({ fuse }) => fuse.settings.current.layout.config);
	const toolbarTheme = useSelector(selectToolbarTheme);

	const classes = useStyles(props);

	useEffect(() => {
		const timer = setInterval(() => checkMessageStatus(), 5000);
		return () => clearInterval(timer);
	}, []);

	const checkMessageStatus = () => {
		checkMessage().then(res => {
			setNotification(res.data.count);
		}).catch(err => {
			console.log(err);
		});
	}

	const handleGoToNotification = () => {
		// if(!notification) return;

		console.log(props);
		// const { history }
	}

	return (
		<ThemeProvider theme={toolbarTheme}>
			<AppBar
				id="fuse-toolbar"
				className={clsx(classes.root, 'flex relative z-10 shadow-md')}
				color="default"
				style={{ backgroundColor: toolbarTheme.palette.background.paper }}
			>
				<Toolbar className="p-0 min-h-48 md:min-h-64">
					{config.navbar.display && config.navbar.position === 'left' && (
						<Hidden lgUp>
							<NavbarMobileToggleButton className="w-40 h-40 p-0 mx-0 sm:mx-8" />
						</Hidden>
					)}

					<div className="flex flex-1">
						<Hidden mdDown>
							<FuseShortcuts className="px-16" />
						</Hidden>
					</div>

					<div className="flex items-center px-8">
						<LanguageSwitcher />

						<FullScreenToggle />

						<FuseSearch />

						
						<IconButton component={Link} to="/messages">
							<Badge badgeContent={notification} color="error">
								<Icon color="action">notifications</Icon>
							</Badge>
						</IconButton>
						
						{/* <Hidden lgUp> */}
							{/* <ChatPanelToggleButton /> */}
						{/* </Hidden> */}

						{/* <QuickPanelToggleButton /> */}

						<UserMenu />
					</div>

					{config.navbar.display && config.navbar.position === 'right' && (
						<Hidden lgUp>
							<NavbarMobileToggleButton />
						</Hidden>
					)}
				</Toolbar>
			</AppBar>
		</ThemeProvider>
	);
}

export default React.memo(ToolbarLayout1);
