import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import _ from '@lodash';

import FuseAnimate from '@fuse/core/FuseAnimate/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import { Typography } from '@material-ui/core';


import SponsorshipCard from 'app/components/cards/SponsorshipCard';
import { CircleFullSpinner } from 'app/components/Spinner';

const SponsorshipContent = ({loading, data, onChangeStatus, ...props}) => {
	const me = useSelector(({ auth }) => auth.user);
	
	const handleAction = (sponsorshipId, action) => {
		switch(action){
			case 'edit':
				break;
			default:
				onChangeStatus && onChangeStatus(sponsorshipId, action);
				break;
		}
	}

	if (data.length === 0) {
		return (
			<FuseAnimate delay={100}>
				<div className="flex flex-1 items-center justify-center h-full">
					<Typography color="textSecondary" variant="h5">
						There are no sponsorships!
					</Typography>
				</div>
			</FuseAnimate>
		);
	}

	return (
		<div className="w-full h-full relative">
			<FuseAnimateGroup
				enter={{animation: 'transition.slideUpBigIn'}}
				className="flex flex-wrap p-14"
			>
				{data.map((sponsorship, index) => 
					<SponsorshipCard
						data={sponsorship}
						control={me.role === 'ADMIN'}
						onTriggeredAction={(action) => handleAction(sponsorship.id, action)}/>
				)}	
			</FuseAnimateGroup>

			{loading && <CircleFullSpinner />}
		</div>
	);
}

export default withRouter(SponsorshipContent);
