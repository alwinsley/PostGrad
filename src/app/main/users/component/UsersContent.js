import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import _ from '@lodash';

import FuseAnimate from '@fuse/core/FuseAnimate/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import { Typography } from '@material-ui/core';

import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

import CoachCard from 'app/components/cards/CoachCard';
import PlayerCard from 'app/components/cards/PlayerCard';
import MessageDlg from 'app/components/MessageDlg';
import Filters from './Filters';
import { CircleFullSpinner } from 'app/components/Spinner';

const UsersContent = ({loading, data, filterable, favorites, onReachBottom, onChangeStatus, onChangeFilter, ...props}) => {
	const me = useSelector(({ auth }) => auth.user);
	const [selectedUser, setSelectedUser] = useState(null);
	const [filters, setFilters] = useState({});

	const handleAction = (user, action) => {
		switch(action){
			case 'message':
				setSelectedUser(user);
				break;
			case 'detail':
				gotoDetail(user.id)
				break;
			default:
				onChangeStatus && onChangeStatus(user.id, action);
				break;
		}
	}

	const gotoDetail = (userId) => {
		const { history } = props;
		history.push(`profile/${userId}`);
	}

	const handleFilter = (e) => {
		const { id, name, value } = e.target;
		const _filters = {...filters, [name]: value};
		setFilters(_filters);
		onChangeFilter && onChangeFilter(_filters);
	}

	const handleClearfilters = () => {
		if(!Object.keys(filters).length) return;

		setFilters({});
		onChangeFilter && onChangeFilter({});
	}

	return (
		<div className="w-full h-full relative">
			{filterable &&
				<Filters
					filters={filters}
					onChange={handleFilter}
					onClearAll={handleClearfilters}/>
			}
			
			{data && !!data.length ? 
				<PerfectScrollbar onYReachEnd={onReachBottom}>
					<FuseAnimateGroup
						enter={{
							animation: 'transition.slideUpBigIn'
						}}
						className="flex flex-wrap p-24"
					>
						{data.map((user, index) => 
							<div className="w-full pb-24 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 sm:p-16" key={index}>
								{user.role === 'PLAYER' ?
									<PlayerCard
										user={user}
										control={me.role === 'ADMIN'}
										favoritable={me.role === 'COACH'}
										isFavorite={favorites.includes(user.id)}
										onTriggeredAction={(action) => handleAction(user, action)}/>
								:
									<CoachCard
										user={user}
										control={me.role === 'ADMIN'}
										onTriggeredAction={(action) => handleAction(user, action)}/>
								}
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

			{!!selectedUser && <MessageDlg open={!!selectedUser} title="Send Message" to={selectedUser} onClose={() => setSelectedUser(null)} /> }
			{loading && <CircleFullSpinner />}
		</div>
	);
}

export default withRouter(UsersContent);
