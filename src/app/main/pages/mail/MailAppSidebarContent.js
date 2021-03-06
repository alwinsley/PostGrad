import FuseAnimate from '@fuse/core/FuseAnimate';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useTranslation } from 'react-i18next';

const folders = [
	{
		id: 0,
		handle: 'inbox',
		title: 'Inbox',
		translate: 'INBOX',
		icon: 'inbox'
	},
	{
		id: 1,
		handle: 'sent',
		title: 'Sent',
		translate: 'SENT',
		icon: 'send'
	},
	// {
	// 	id: 2,
	// 	handle: 'drafts',
	// 	title: 'Drafts',
	// 	translate: 'DRAFTS',
	// 	icon: 'email_open'
	// },
	// {
	// 	id: 3,
	// 	handle: 'spam',
	// 	title: 'Spam',
	// 	translate: 'SPAM',
	// 	icon: 'error'
	// },
	// {
	// 	id: 4,
	// 	handle: 'trash',
	// 	title: 'Trash',
	// 	translate: 'TRASH',
	// 	icon: 'delete'
	// }
];

const useStyles = makeStyles(theme => ({
	listItem: {
		color: 'inherit!important',
		textDecoration: 'none!important',
		height: 40,
		width: 'calc(100% - 16px)',
		borderRadius: '0 20px 20px 0',
		paddingLeft: 24,
		paddingRight: 12,
		'&.active': {
			backgroundColor: theme.palette.secondary.main,
			color: `${theme.palette.secondary.contrastText}!important`,
			pointerEvents: 'none',
			'& .list-item-icon': {
				color: 'inherit'
			}
		},
		'& .list-item-icon': {
			fontSize: 16,
			width: 16,
			height: 16,
			marginRight: 16
		}
	},
	listSubheader: {
		paddingLeft: 24
	}
}));

function MailAppSidebarContent(props) {
	const classes = useStyles();
	const { t } = useTranslation('mailApp');

	return (
		<FuseAnimate animation="transition.slideUpIn" delay={400}>
			<div className="flex-auto border-l-1">
				<div>
					<List>
						{folders.length > 0 &&
							folders.map(folder => (
								<ListItem
									button
									component={NavLinkAdapter}
									to={`/messages/${folder.handle}`}
									key={folder.id}
									activeClassName="active"
									className={classes.listItem}
								>
									<Icon className="list-item-icon" color="action">
										{folder.icon}
									</Icon>
									<ListItemText
										primary={folder.translate ? t(folder.translate) : folder.title}
										disableTypography
									/>
								</ListItem>
							))}
					</List>
				</div>
			</div>
		</FuseAnimate>
	);
}

export default MailAppSidebarContent;
