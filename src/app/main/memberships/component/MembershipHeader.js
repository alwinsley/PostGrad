import React, { useState } from 'react';

import FuseAnimate from '@fuse/core/FuseAnimate';
import { 
	Icon,
	Typography,
} from '@material-ui/core';

function MembershipHeader({title, ...props}) {

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
		</div>
	);
}

export default MembershipHeader;
