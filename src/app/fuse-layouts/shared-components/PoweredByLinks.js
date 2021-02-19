import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import React from 'react';

function PoweredByLinks() {
	return (
		<FuseAnimateGroup
			enter={{
				animation: 'transition.expandIn'
			}}
			className="flex items-center"
		>
			<Tooltip title="NPGAA" placement="top">
				<a	className="px-4"
					href="http://www.npgaa.org/"
					target="_blank"
				>
					<img
						src="assets/images/logos/NPGAALogo.jpg"
						width="150"
					/>
				</a>
			</Tooltip>
		</FuseAnimateGroup>
	);
}

export default PoweredByLinks;
