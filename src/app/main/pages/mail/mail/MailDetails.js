import React, { useState } from 'react';
import { withRouter, useParams } from 'react-router-dom';

import _ from '@lodash';
import {
	Avatar,
	Icon,
	IconButton,
	Typography
} from '@material-ui/core';

import FuseAnimate from '@fuse/core/FuseAnimate';
import { useDeepCompareEffect } from '@fuse/hooks';

import MessageDlg from 'app/components/MessageDlg';

import { asset_path } from 'app/helpers/resource';
import { dateString } from 'app/helpers/functions';
import { getMessage, deleteMessages } from 'app/services/messageService';

const MailDetails = (props) => {
	const routeParams = useParams();
	const [mail, setMail] = useState(null);
	const [open, setOpen] = useState(false);

	useDeepCompareEffect(() => {
		const { id } = routeParams;

		getMessage(id).then(res => {
			setMail(res.data);
		}).catch(err => {
			console.log(err);
		});

	}, [routeParams]);

	const handleDeleteMessage = () => {
		const { history } = props;

		deleteMessages([mail.id]).then(res => {
			history.goBack();
		}).catch(err => {
			console.log(err);
		});
	}

	if (!mail) {
		return null;
	}

	const other = routeParams.type === 'inbox' ? mail.sender : mail.receiver;
	const me = routeParams.type === 'inbox' ? mail.receiver : mail.sender;

	return (
		<div className="p-16 sm:p-24">
			<FuseAnimate animation="transition.slideUpIn" delay={200}>
				<div>
					<div className="flex items-start justify-between">
						<div className="flex items-center justify-start">
							<Avatar alt={other.name} src={asset_path(other.avatar)} />

							<div className="flex flex-col mx-8">
								<span>{other.name}</span>
								<Typography variant="body2" color="textSecondary" component="p">{dateString(mail.date)}</Typography>
							</div>
						</div>
						<div>
							<IconButton onClick={(e) => setOpen(true)}>
								<Icon>reply</Icon>
							</IconButton>
							<IconButton onClick={handleDeleteMessage}>
								<Icon>delete</Icon>
							</IconButton>
						</div>
					</div>

					<Typography variant="body2" dangerouslySetInnerHTML={{ __html: mail.message }} />
				</div>
			</FuseAnimate>

			{open && <MessageDlg open={open} title="Reply Message" to={mail.sender} mail={mail} onClose={() => setOpen(false)} />}
		</div>
	);
}

export default withRouter(MailDetails);
