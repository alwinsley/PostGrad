import React, { useState } from 'react';

import {
	Icon,
	IconButton,
	List,
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
	Paper,
	Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import moment from 'moment';

import { dateString } from 'app/helpers/functions';
import { RedIconBtn } from 'app/components/ColorBtns';

const useStyles = makeStyles((theme) => ({
	list: {
		padding: 0,
		'& > li': {
			borderBottom: '1px solid #8080805e',
			display: 'block',
			padding: 0
		},
		'& > li:last-child': {
			border: 0
		},
		'& .MuiListItemText-root': {
			minWidth: 300,
			marginRight: 15
		},
		'& .MuiListItemSecondaryAction-root': {
			right: 0
		}
	}
}));

function ScheduleWidget({ data, editable, onTriggerAction }) {
	const classes = useStyles();

	const handleAction = (e, item, type) => {
		e.preventDefault();
		
		onTriggerAction(item, type);
	}

	return (
		<Paper className="w-full rounded-8 shadow-md max-w-lg">
			<List className={classes.list}>
				{data.map(item => (
					<ListItem key={item.id}>
						<a href={item.link || ''}
							target="_blank"
							role="button"
							className={`w-full relative items-center p-12 flex flex-wrap bg-gray-100 no-underline ${editable ? 'pr-96' : ''}`}
						>
							<ListItemText primary={(<h2>{item.title}</h2>)} secondary={item.location} />
							<Typography className="whitespace-nowrap text-xs text-blue-700">{moment(dateString(item.date), "YYYY-MM-DD hh:mm:ss").format('lll') }</Typography>
							{editable && 
								<ListItemSecondaryAction>
									<IconButton color="secondary" onClick={(e) => handleAction(e, item, 'Edit')}><Icon>edit</Icon></IconButton>
									<RedIconBtn onClick={(e) => handleAction(e, item, 'Delete')}><Icon>delete</Icon></RedIconBtn>
								</ListItemSecondaryAction>
							}
						</a>
						{item.desc &&
							<div className="p-12">{item.desc}</div>
						}
					</ListItem>
				))}
			</List>
		</Paper>
	);
}

export default React.memo(ScheduleWidget);
