import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from '@lodash';
import reducer from './store';

import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import {
	Typography,
	Select
}from '@material-ui/core';
import withReducer from 'app/store/withReducer';
import { makeStyles } from '@material-ui/core/styles';
// import Slider from 'react-slick';
// import "slick-carousel/slick/slick.css"; 
// import "slick-carousel/slick/slick-theme.css";


import PlayerCard from 'app/components/cards/PlayerCard';
import TeamCard from 'app/components/cards/TeamCard';
import GameCard from 'app/components/cards/GameCard';
import ImageCard from 'app/components/cards/ImageCard';
import MessageDlg from 'app/components/MessageDlg';

import ScheduleWidget from 'app/components/ScheduleWidget';

import { getAnalytics } from 'app/services/dashboard_api';

const DateRange = [ 'Today', 'Tommorrow', 'Week', 'Month',  'All'];

const useStyles = makeStyles(theme => ({
	layoutHeader: {
		backgroundColor: '#192d3e',
		padding: '12px 16px',
		color: 'white',
		display: 'flex',
		alignItems: 'center',
		'& .action': {
			marginLeft: '10px',
			color: 'white'
		},
		'& .MuiSelect-select': {
			paddingLeft: '24px',
			color: 'white',
			'& > option': {
				color: 'black'
			}
		},
		'& .MuiSelect-icon': {
			color: 'white'
		}
	}
}));

function AnalyticsDashboardApp(props) {
	const me = useSelector(({ auth }) => auth.user);
	const classes = useStyles();
	const [recruits, setRecruits] = useState([]);
	const [teams, setTeams] = useState([]);
	const [games, setGames] = useState([]);
	const [schedules, setSchedules] = useState([]);
	const [ads, setAds] = useState([]);

	const [scheduleRange, setScheduleRange] = useState('Today');
	const [selectedUser, setSelectedUser] = useState(null);

	useEffect(() => {
		getAnalytics().then(res => {
			setRecruits(res.data.recruits);
			setTeams(res.data.teams);
			setGames(res.data.games);
			setSchedules(res.data.schedules);
			setAds(res.data.sponsorships);
		});
	}, []);

	const handleAction = (user, action) => {
		if(action === 'message') setSelectedUser(user);
		else if(action === 'detail') gotoUserDetail(user.id);
	}

	const gotoUserDetail = (userId) => {
		const { history } = props;
		history.push(`/profile/${userId}`);
	}

	const handleChangeScheduleRange = (e) => {
		const { value } = e.target;

		setScheduleRange(value);
	}

	return (
		<div className="w-full">
			<FuseAnimateGroup
				enter={{animation: 'transition.fadeIn'}}
				className="flex flex-wrap p-24 justify-center"
			>
				{ads.map((sponsorship, index) => 
					<div className="w-full pb-24 sm:w-1/2 md:w-1/3 lg:w-1/4 sm:p-10" key={index}>
						<ImageCard
							data={sponsorship}
							control={false}
						/>
					</div>
				)}
			</FuseAnimateGroup>

			<Typography variant="h6" className={classes.layoutHeader}>Top Ten Recruits </Typography>
			<FuseAnimateGroup
				enter={{animation: 'transition.slideUpBigIn'}}
				className="flex flex-wrap p-24"
			>
				{recruits.map((user, index) => 
					<div className="w-full pb-24 sm:w-1/2 md:w-1/3 lg:w-1/5 sm:p-16" key={index}>
						<PlayerCard user={user}	onTriggeredAction={(action) => handleAction(user, action)}/>
					</div>
				)}	
			</FuseAnimateGroup>

			<Typography variant="h6" className={classes.layoutHeader}>Game of the Week </Typography>
			<FuseAnimateGroup
				enter={{animation: 'transition.slideUpBigIn'}}
				className="flex flex-wrap p-24"
			>
				{games.map((game, index) => 
					<div className="w-full pb-24 sm:w-1/2 md:w-1/3 lg:w-1/5 sm:p-16" key={index}>
						<GameCard game={game}/>
					</div>
				)}
			</FuseAnimateGroup>
			
			<div className={classes.layoutHeader}>
				<Typography variant="h6" >Schedules</Typography>
				{/* <Select
					native
					value={scheduleRange}
					onChange={handleChangeScheduleRange}
					inputProps={{ name: 'range' }}
					disableUnderline
					className="action"
				>
					{DateRange.map(range => <option key={range} value={range}>{range}</option>)}
				</Select> */}
			</div>
			<FuseAnimateGroup
				enter={{animation: 'transition.slideUpBigIn'}}
				className="flex flex-wrap p-24"
			>
				<ScheduleWidget data={schedules}/>
			</FuseAnimateGroup>

			<Typography variant="h6" className={classes.layoutHeader}>Top Programs </Typography>
			<FuseAnimateGroup
				enter={{animation: 'transition.slideUpBigIn'}}
				className="flex flex-wrap p-24"
			>
				{teams.map((team, index) => 
					<div className="w-full pb-24 sm:w-1/2 md:w-1/3 lg:w-1/5 sm:p-16" key={index}>
						<TeamCard team={team}/>
					</div>
				)}	
			</FuseAnimateGroup>

			{!!selectedUser && <MessageDlg open={!!selectedUser} title="Send Message" to={selectedUser} onClose={() => setSelectedUser(null)} /> }
		</div>
	);
}

export default withReducer('analyticsDashboardApp', reducer)(AnalyticsDashboardApp);
