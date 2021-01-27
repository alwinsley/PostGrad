import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';

import { dateString } from 'app/helpers/functions';
import { RedIconBtn } from 'app/components/ColorBtns';

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 800
	},
	list: {
		'& .MuiListItem-secondaryAction' : {
			paddingRight: 72
		},
		'& .MuiListItem-root': {
			flexWrap: 'wrap',
			borderBottom: '1px solid #80808021'
		},
		'& .MuiListItem-root:last-child': {
			border: 0
		},
		'& .MuiListItemText-root': {
			minWidth: 300,
			marginRight: 15
		}
	},
	date: {
		whiteSpace: 'nowrap',
		fontSize: 11
	}
}));

function ScheduleWidget({ data, editable, onTriggerAction }) {
	const classes = useStyles();

	function handleDeleteSchedule(item) {
		onTriggerAction(item.id, 'Delete');
	}

	return (
		<Paper className={`w-full rounded-8 shadow ${classes.root}`}>
			<List className={classes.list}>
				{data.map(item => (
					<ListItem key={item.id}>
						<ListItemText primary={(<h2>{item.title}</h2>)} secondary={item.location} />
						<Typography className={classes.date}>{moment(dateString(item.date), "YYYY-MM-DD hh:mm:ss").format('lll') }</Typography>
						{editable && 
							<ListItemSecondaryAction>
								<RedIconBtn onClick={() => handleDeleteSchedule(item)}><Icon>delete</Icon></RedIconBtn>
							</ListItemSecondaryAction>
						}
					</ListItem>
				))}
			</List>
		</Paper>
	);
}

export default React.memo(ScheduleWidget);
