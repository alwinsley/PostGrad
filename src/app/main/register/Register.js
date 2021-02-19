import React, { useState } from 'react';
import clsx from 'clsx';

import FuseAnimate from '@fuse/core/FuseAnimate';
import { 
	Card,
	CardContent,
	Typography,
	Tabs,
	Tab,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Icon
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import { Link } from 'react-router-dom';
import JWTRegisterTab from './tabs/JWTRegisterTab';

const useStyles = makeStyles(theme => ({
	root: {
		background: `linear-gradient(to left, ${theme.palette.primary.dark} 0%, ${darken(
			theme.palette.primary.dark,
			0.5
		)} 100%)`,
		color: theme.palette.primary.contrastText
	},
	leftSection: {},
	rightSection: {
		background: `linear-gradient(to left, ${theme.palette.primary.dark} 0%, ${darken(
			theme.palette.primary.dark,
			0.5
		)} 100%)`,
		color: theme.palette.primary.contrastText
	},
	list: {
		padding: 0,
		'& .MuiListItemIcon-root': {
			color: 'white',
			minWidth: 36
		}
	}
}));

function Register() {
	const classes = useStyles();
	const [selectedTab, setSelectedTab] = useState(0);
	const [userType, setUserType] = useState('COACH');

	function handleTabChange(event, value) {
		setSelectedTab(value);
		setUserType(value === 0 ? 'COACH' : 'PLAYER');
	}

	return (
		<div
			className={clsx(
				classes.root,
				'flex flex-col flex-auto items-center justify-center flex-shrink-0 p-16 md:p-24'
			)}
		>
			<FuseAnimate animation="transition.expandIn">
				<div className="flex w-full max-w-400 md:max-w-3xl rounded-12 shadow-2xl overflow-hidden">
					<Card
						className={clsx(
							classes.leftSection,
							'flex flex-col w-full max-w-sm items-center justify-center shadow-0'
						)}
						square
					>
						<CardContent className="flex flex-col items-center justify-center w-full py-96 max-w-320">
							<FuseAnimate delay={300}>
								<div className="flex items-center justif-center mb-32">
									<img className="logo-icon" width="128" src="logo.png" alt="logo" />
								</div>
							</FuseAnimate>

							{/* <Typography className="text-24 font-800 logo-text mb-32" color="inherit">Welcome to PostGrad</Typography> */}

							<Tabs
								value={selectedTab}
								onChange={handleTabChange}
								variant="fullWidth"
								className="w-full mb-32"
							>
								<Tab
									className="min-w-0"
									label="Coach"
								/>
								<Tab
									className="min-w-0"
									label="Player"
								/>
							</Tabs>

							<JWTRegisterTab type={userType}/>
						</CardContent>

						<div className="flex flex-col items-center justify-center pb-32">
							<div>
								<span className="font-medium mr-8">Already have an account?</span>
								<Link className="font-medium" to="/login">
									Login
								</Link>
							</div>
						</div>
					</Card>

					<div
						className={clsx(classes.rightSection, 'hidden md:flex flex-1 items-center justify-center p-64')}
					>
						<div className="max-w-320">
						<FuseAnimate animation="transition.slideUpIn" delay={400}>
								<Typography variant="h3" color="inherit" className="font-800 leading-tight">
									Welcome to <br/>Post Grad Recruits
								</Typography>
							</FuseAnimate>

							<FuseAnimate delay={500}>
								<div>
									<Typography variant="h6" color="inherit" className="mt-20">
										The ultimate portal for post grad athletes!<br/>
										Here you get :
									</Typography>
									<List dense>
										<ListItem className={classes.list}>
											<ListItemIcon><Icon>remove</Icon></ListItemIcon>
											<ListItemText primary="Access to college coaches looking exclusively for post grad transfers"/>
										</ListItem>
										<ListItem className={classes.list}>
											<ListItemIcon><Icon>remove</Icon></ListItemIcon>
											<ListItemText primary="promo codes / discounts to athletic apparel"/>
										</ListItem>
										<ListItem className={classes.list}>
											<ListItemIcon><Icon>remove</Icon></ListItemIcon>
											<ListItemText primary="transcript evaluation to understand what  division you're eligible for"/>
										</ListItem>
										<ListItem className={classes.list}>
											<ListItemIcon><Icon>remove</Icon></ListItemIcon>
											<ListItemText primary="post grad player ratings"/>
										</ListItem>
										<ListItem className={classes.list}>
											<ListItemIcon><Icon>remove</Icon></ListItemIcon>
											<ListItemText primary="and much more!"/>
										</ListItem>
									</List>
								</div>
							</FuseAnimate>
						</div>
					</div>
				</div>
			</FuseAnimate>
		</div>
	);
}

export default Register;
