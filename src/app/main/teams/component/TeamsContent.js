import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import _ from '@lodash';

import FuseAnimate from '@fuse/core/FuseAnimate/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import { 
	Fab,
	Icon,
	Typography,
} from '@material-ui/core';


import TeamCard from 'app/components/cards/TeamCard';
import { CircleFullSpinner } from 'app/components/Spinner';

const TeamsContent = ({loading, data, onChangeStatus, ...props}) => {
	const me = useSelector(({ auth }) => auth.user);
	
	const handleAction = (teamId, action) => {
		switch(action){
			case 'edit':
				break;
			default:
				onChangeStatus && onChangeStatus(teamId, action);
				break;
		}
	}

	if (data.length === 0) {
		return (
			<FuseAnimate delay={100}>
				<div className="flex flex-1 items-center justify-center h-full">
					<Typography color="textSecondary" variant="h5">
						There are no teams!
					</Typography>
				</div>
			</FuseAnimate>
		);
	}

	return (
		<div className="w-full h-full relative">
			<FuseAnimateGroup
				enter={{animation: 'transition.slideUpBigIn'}}
				className="flex flex-wrap p-24"
			>
				{data.map((team, index) => 
					<div className="w-full pb-24 sm:w-1/2 md:w-1/3 lg:w-1/5 sm:p-16" key={index}>
						<TeamCard
							team={team}
							control={me.role === 'ADMIN'}
							onTriggeredAction={(action) => handleAction(team.id, action)}/>
					</div>
				)}	
			</FuseAnimateGroup>

			{loading && <CircleFullSpinner />}
		</div>
	);
}

export default withRouter(TeamsContent);
