import React from 'react';

import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
	header: {
		height: 600,
		background: `linear-gradient(to left, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
		color: theme.palette.primary.contrastText
	},
	cardHeader: {
		backgroundColor: theme.palette.primary[800],
		color: theme.palette.getContrastText(theme.palette.primary[800])
	},
	current: {
		padding: '6px 16px'
	}
}));

function MembershipContent({ current, memberships, onSelectItem, ...props}) {
	const classes = useStyles();

	return (
		<div>
			<div className={clsx(classes.header, 'flex')}>
				<div className="p-24 w-full max-w-2xl mx-auto">
					<div className="text-center my-128 mx-24">
						<FuseAnimate animation="transition.slideUpIn" duration={400} delay={100}>
							<Typography variant="h2" color="inherit" className="font-light">
								Membership Access
							</Typography>
						</FuseAnimate>

						{/* <FuseAnimate duration={400} delay={600}>
							<Typography
								variant="subtitle1"
								color="inherit"
								className="opacity-75 mt-16 mx-auto max-w-512"
							>
								The most advanced customer support tools with a simple and affordable pricing. And you
								can always try for 30 days, free!
							</Typography>
						</FuseAnimate> */}
					</div>
				</div>
			</div>

			<div className="-mt-192">
				<div className="w-full max-w-2xl mx-auto">
					<FuseAnimateGroup
						enter={{ animation: 'transition.slideUpBigIn'}}
						className="flex items-center justify-center flex-wrap"
					>
						{ !!memberships.length && memberships.map(mem => 
							<div key={mem.id} className="w-full max-w-320 sm:w-1/3 p-12">
								<Card className="rounded-8">
									<div className={clsx(classes.cardHeader, 'px-24 py-16')}>
										<Typography variant="subtitle1" color="inherit">{mem.title}</Typography>
									</div>

									<CardContent className="p-32">
										<div className="flex justify-center">
											<Typography variant="h5" color="textSecondary">$</Typography>
											<div className="flex items-end">
												<Typography className="text-72 mx-4 font-light leading-none">{mem.price}</Typography>
												<Typography variant="subtitle1" color="textSecondary">/ {mem.month} month</Typography>
											</div>
										</div>

										<Divider className="my-32" />

										{/* <div className="flex flex-col">
											<Typography variant="subtitle1" className="">
												<span className="font-bold mx-4">10</span>Projects
											</Typography>
											<Typography variant="subtitle1" className="">
												<span className="font-bold mx-4">10</span>Pages
											</Typography>
											<Typography variant="subtitle1" className="">
												<span className="font-bold mx-4">100</span>	Mb Disk Space
											</Typography>
										</div> */}
									</CardContent>

									<div className="flex justify-center pb-32">
										{current.indexOf(mem.id) > -1 ?
											<div className={classes.current}>CURRENT ACCESS</div>
											:
											<Button variant="contained" color="secondary" className="w-128" onClick={() => onSelectItem(mem)}>Get Access</Button>
										}
									</div>
								</Card>
							</div>
						)}
						
					</FuseAnimateGroup>
				</div>
			</div>
		</div>
	);
}

export default MembershipContent;
