import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import _ from '@lodash';

import FuseAnimate from '@fuse/core/FuseAnimate/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import { 
	Typography,
	TextField,
	MenuItem,
	IconButton,
	Icon
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { DatePicker } from "@material-ui/pickers";
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

import CoachCard from 'app/components/cards/CoachCard';
import PlayerCard from 'app/components/cards/PlayerCard';
import MessageDlg from 'app/components/MessageDlg';
import { CircleFullSpinner } from 'app/components/Spinner';
import { positions, states } from 'app/helpers/resource';

const useStyles = makeStyles((theme) => ({
	filter: {
		backgroundColor: '#121212',
		color: 'white',
		padding: '1rem',
		display: 'flex',
		alignItems: 'flex-end',
		position: 'relative',
		'& .MuiFormLabel-root': {
			color: '#afafaf'
		},
		'& .MuiSelect-icon': {
			color: '#afafaf'
		},
		'& .MuiInput-underline:before': {
			borderColor: '#afafaf'
		},
		'& .MuiInputBase-input': {
			color: 'white'
		}
	},
	formcontrol: {
		minWidth: 100,
		maxWidth: 300,
		marginRight: 10,
		flex: '1 1 300px'
	},
	datePicker: {
		minWidth: 50,
		maxWidth: 300,
		marginRight: 10,
		flex: '1 1 100px'
	},
	clear: {
		position: 'absolute',
		right: '-8px',
		top: '-8px',
		color: '#afafaf'
	}
}));

const UsersContent = ({loading, data, filterable, favorites, onReachBottom, onChangeStatus, onChangeFilter, ...props}) => {
	const me = useSelector(({ auth }) => auth.user);
	const classes = useStyles();
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
				<div className={classes.filter}>
					<TextField
						id="position"
						name="position"
						select
						label="Position"
						value={filters.position || ''}
						className={classes.formcontrol}
						onChange={handleFilter}
					>
						{positions.map(p => (
							<MenuItem key={p.value} value={p.value}>
								{p.value}
							</MenuItem>
						))}
					</TextField>
					<TextField
						id="state"
						name="state"
						select
						label="State"
						value={filters.state || ''}
						className={classes.formcontrol}
						onChange={handleFilter}
					>
						{states.map(s => (
							<MenuItem key={s.value} value={s.label}>
								{s.label}
							</MenuItem>
						))}
					</TextField>
					<DatePicker
						className={classes.datePicker}
						autoOk
						variant="inline"
						views={["year"]}
						label="Year"
						value={filters.year || null}
						onChange={date => handleFilter({target: {name: 'year', value: date}})}
					/>
					<IconButton aria-label="delete" className={classes.clear} onClick={handleClearfilters}>
						<Icon>close</Icon>
					</IconButton>
				</div>
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
