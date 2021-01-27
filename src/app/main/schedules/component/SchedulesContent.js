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

import ScheduleWidget from 'app/components/ScheduleWidget';
import { CircleFullSpinner } from 'app/components/Spinner';

const SchedulesContent = ({loading, data, onChangeStatus, ...props}) => {
	const me = useSelector(({ auth }) => auth.user);
	
	if (data.length === 0) {
		return (
			<FuseAnimate delay={100}>
				<div className="flex flex-1 items-center justify-center h-full">
					<Typography color="textSecondary" variant="h5">
						There are no schedules!
					</Typography>
				</div>
			</FuseAnimate>
		);
	}

	return (
		<div className="w-full h-full relative">
			<FuseAnimateGroup
				enter={{animation: 'transition.slideUpBigIn'}}
				className="flex flex-wrap p-24 justify-center"
			>
				<ScheduleWidget data={data} editable onTriggerAction={onChangeStatus}/>

			</FuseAnimateGroup>

			{loading && <CircleFullSpinner />}
		</div>
	);
}

export default withRouter(SchedulesContent);
