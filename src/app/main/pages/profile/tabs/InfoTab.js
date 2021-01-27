import React, { useEffect, useState } from 'react';
import { useForm, useDeepCompareEffect } from '@fuse/hooks';
import {
	Grid,
	TextField,
	Card,
	AppBar,
	Toolbar,
	Typography,
	CardContent
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';

const useStyles = makeStyles((theme) => ({
	card: {
		maxWidth: 800
	}
}));

const InfoTab = ({profile}) => {
	const classes = useStyles();
	
	return (
		<div className="w-full h-full">
			<FuseAnimateGroup enter={{ animation: 'transition.slideUpBigIn'	}}>
				<Card className={`mb-16 rounded-8 shadow ${classes.card}`}>
					<AppBar position="static" elevation={0}>
						<Toolbar className="px-8">
							<Typography variant="subtitle1" color="inherit" className="flex-1 px-12">
								General Information
							</Typography>
						</Toolbar>
					</AppBar>

					<CardContent>
						<div className="mb-24">
							<Typography className="font-bold mb-4 text-15">Name</Typography>
							<Typography>{profile.name}</Typography>
						</div>
						<div className="mb-24">
							<Typography className="font-bold mb-4 text-15">Email</Typography>
							<Typography>{profile.email}</Typography>
						</div>
						<div className="mb-24">
							<Typography className="font-bold mb-4 text-15">Phone Number</Typography>
							<Typography>{profile.phone || '---'}</Typography>
						</div>
						<div className="mb-24">
							<Typography className="font-bold mb-4 text-15">City</Typography>
							<Typography>{profile.city || '---'}</Typography>
						</div>
						<div className="mb-24">
							<Typography className="font-bold mb-4 text-15">State</Typography>
							<Typography>{profile.state || '---'}</Typography>
						</div>
						<div className="mb-24">
							<Typography className="font-bold mb-4 text-15">Zip Code</Typography>
							<Typography>{profile.zipcode || '---'}</Typography>
						</div>
						<div className="mb-24">
							<Typography className="font-bold mb-4 text-15">Twitter</Typography>
							<Typography>{profile.twitter || '---'}</Typography>
						</div>

						<div className="mb-24">
							<Typography className="font-bold mb-4 text-15">Description</Typography>
							<Typography>{profile.description || '---'}</Typography>
						</div>
					</CardContent>
				</Card>

				{profile.role === 'PLAYER' && 
					<Card className={`mb-16 rounded-8 shadow ${classes.card}`}>
						<AppBar position="static" elevation={0}>
							<Toolbar className="px-8">
								<Typography variant="subtitle1" color="inherit" className="flex-1 px-12">
									About Me
								</Typography>
							</Toolbar>
						</AppBar>

						<CardContent>
							<div className="mb-24">
								<Typography className="font-bold mb-4 text-15">Current School</Typography>
								<Typography>{profile.current_school}</Typography>
							</div>
							<div className="mb-24">
								<Typography className="font-bold mb-4 text-15">Year</Typography>
								<Typography>{profile.year}</Typography>
							</div>
							<div className="mb-24">
								<Typography className="font-bold mb-4 text-15">Position</Typography>
								<Typography>{profile.position || '---'}</Typography>
							</div>
							<div className="mb-24">
								<Typography className="font-bold mb-4 text-15">Height</Typography>
								<Typography>{profile.height || '---'}</Typography>
							</div>
							<div className="mb-24">
								<Typography className="font-bold mb-4 text-15">Weight</Typography>
								<Typography>{profile.weight || '---'}</Typography>
							</div>
							<div className="mb-24">
								<Typography className="font-bold mb-4 text-15">HS/College</Typography>
								<Typography>{profile.hs_college || '---'}</Typography>
							</div>
							<div className="mb-24">
								<Typography className="font-bold mb-4 text-15">ACT</Typography>
								<Typography>{profile.act || '---'}</Typography>
							</div>

							<div className="mb-24">
								<Typography className="font-bold mb-4 text-15">SAT</Typography>
								<Typography>{profile.sat || '---'}</Typography>
							</div>
						</CardContent>
					</Card>
				}
				
			</FuseAnimateGroup>
		</div>
	);
}

export default InfoTab;
