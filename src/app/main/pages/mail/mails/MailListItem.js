import React from 'react';
import _ from '@lodash';
import { withRouter, useParams } from 'react-router-dom';

import {
	Avatar,
	Checkbox,
	ListItem,
	Typography,
	IconButton,
	Icon
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import { asset_path } from 'app/helpers/resource';
import { dateString } from 'app/helpers/functions';

const pathToRegexp = require('path-to-regexp');

const useStyles = makeStyles(theme => ({
	mailItem: {
		borderBottom: `1px solid  ${theme.palette.divider}`,

		'&.unread': {
			background: 'rgba(0,0,0,0.03)'
		},
		'&.selected': {
			'&::after': {
				content: '""',
				position: 'absolute',
				left: 0,
				display: 'block',
				height: '100%',
				width: 3,
				backgroundColor: theme.palette.primary.main
			}
		}
	},
	avatar: {
		backgroundColor: theme.palette.primary[500]
	}
}));

const MailListItem = ({mail, checked, onSelect, onReply, replyable, ...props}) => {
	const routeParams = useParams();
	const classes = useStyles(props);

	const handleReplyMessage = (e) => {
		e.preventDefault();
		e.stopPropagation();
		
		onReply(mail);
	}

	const toPath = pathToRegexp.compile(props.match.path);
	const other = routeParams.type === 'inbox' ? mail.sender : mail.receiver;
	
	return (
		<ListItem
			dense
			button
			onClick={() =>
				props.history.push(
					toPath({...routeParams,	id: mail.id })
				)
			}
			className={clsx(
				classes.mailItem,
				checked && 'selected',
				!mail.read && 'unread',
				'py-16 px-0 md:px-8'
			)}
		>
			<Checkbox
				tabIndex={-1}
				disableRipple
				checked={checked}
				onChange={() => onSelect(mail)}
				onClick={ev => ev.stopPropagation()}
			/>

			<div className="flex flex-1 flex-col relative overflow-hidden">
				<div className="flex items-center justify-between px-16 pb-8">
					<div className="flex items-center">
						<Avatar alt={other.name} src={asset_path(other.avatar)} />
						<div className="mx-8">
							<Typography variant="body2" >{other.name}</Typography>
							<Typography variant="body2" color="textSecondary" component="p">{dateString(mail.date)}</Typography>
						</div>
					</div>
					{replyable && 
						<IconButton onClick={handleReplyMessage}>
							<Icon>reply</Icon>
						</IconButton>
					}
				</div>

				<div className="flex flex-col px-16 py-0">
					<Typography color="textSecondary" className="truncate">
						{_.truncate(mail.message.replace(/<(?:.|\n)*?>/gm, ''), { length: 180 })}
					</Typography>
				</div>
			</div>
		</ListItem>
	);
};

export default withRouter(MailListItem);
