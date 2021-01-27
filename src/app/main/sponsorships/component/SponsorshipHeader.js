import React from 'react';

import FuseAnimate from '@fuse/core/FuseAnimate';
import { 
	Fab,
	Icon,
	Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	addButton: {
		position: 'absolute',
		right: 12,
		bottom: 30,
		zIndex: 99
	}
}));

function SponsorshipHeader({title, onCreateSponsorship, ...props}) {
	const classes = useStyles();

	return (
		<div className="flex flex-1 items-center justify-between p-4 sm:p-24">
			<div className="flex flex-shrink items-center sm:w-224">
				<div className="flex items-center">
					<FuseAnimate animation="transition.expandIn" delay={300}>
						<Icon className="text-32">supervisor_account</Icon>
					</FuseAnimate>
					<FuseAnimate animation="transition.slideLeftIn" delay={300}>
						<Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
							{title}
						</Typography>
					</FuseAnimate>
				</div>
			</div>

			<FuseAnimate animation="transition.expandIn" delay={500}>
				<Fab
					color="secondary"
					aria-label="add"
					className={classes.addButton}
					onClick={onCreateSponsorship}
				>
					<Icon>add</Icon>
				</Fab>
			</FuseAnimate>
		</div>

		
	);
}

export default SponsorshipHeader;
