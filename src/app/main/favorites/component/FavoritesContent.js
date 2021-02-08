import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import _ from '@lodash';

import FuseAnimate from '@fuse/core/FuseAnimate/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import { 
	Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

import PlayerCard from 'app/components/cards/PlayerCard';
import { CircleFullSpinner } from 'app/components/Spinner';

const useStyles = makeStyles((theme) => ({
	
}));

const FavoritesContent = ({loading, data, onReachBottom, onChangeStatus, ...props}) => {
	const me = useSelector(({ auth }) => auth.user);
	const classes = useStyles();

	return (
		<div className="w-full h-full relative">
			{data && !!data.length ? 
				<PerfectScrollbar onYReachEnd={onReachBottom}>
					<FuseAnimateGroup
						enter={{
							animation: 'transition.slideUpBigIn'
						}}
						className="flex flex-wrap p-24"
					>
						{data.map((user, index) => 
							<div className="w-full pb-24 sm:w-1/2 md:w-1/3 lg:w-1/5 sm:p-16" key={index}>
								<PlayerCard
									user={user}
									favoritable
									isFavorite={true}
									onTriggeredAction={(action) => onChangeStatus(user, action)}/>
							</div>
						)}
					</FuseAnimateGroup>
				</PerfectScrollbar>
				:
				<FuseAnimate delay={100}>
					<div className="flex flex-1 items-center justify-center h-full">
						<Typography color="textSecondary" variant="h5">
							There are no users!
						</Typography>
					</div>
				</FuseAnimate>
			}

			{loading && <CircleFullSpinner />}
		</div>
	);
}

export default withRouter(FavoritesContent);
