import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { withRouter, useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';
import MailListItem from './MailListItem';

import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import MessageDlg from 'app/components/MessageDlg';

import { getMessages, deleteMessages } from 'app/services/messageService';

const MailList = ({ checkstatus, searchText, onChangeCheckStatus, isDeleting, ...props}) => {
	const { t } = useTranslation('mailApp');
	const routeParams = useParams();
	const [type, setType] = useState('inbox');
	const [messages, setMessages] = useState([]);
	const [ended, setEnded] = useState(false);
	const [offset, setOffset] = useState(0);
	const [loading, setLoading] = useState(false);
	const [selectedMessage, setSelectedMessage] = useState(null);
	const [checkedIds, setCheckedIds] = useState([]);

	useDeepCompareEffect(() => {
		setType(routeParams.type);
	}, [routeParams]);

	useEffect(() => {
		updateMessages(0);
	}, [type, searchText]);

	useEffect(() => {
		if(checkstatus === 'all'){
			let _ids = messages.map(m => m.id);
			setCheckedIds(_ids);
		}else if(checkstatus === 'none'){
			setCheckedIds([]);
		}
	}, [checkstatus]);

	useEffect(() => {
		if(isDeleting) deleteSelection();
	}, [isDeleting]);

	const handleReachBottom = () => {
		if(ended || loading) return;
		updateMessages(offset + 1);
	}

	const updateMessages = (pageOffset) => {
		setLoading(true);

		getMessages({type, offset: pageOffset, search: searchText}).then(res => {
			let _messages = res.data.messages;
			if(pageOffset === 0) setMessages(_messages);
			else setMessages([...messages, ..._messages]);

			if(res.data.isMore){
				setEnded(false);
				setOffset(pageOffset);
			}else{
				setEnded(true);
			}

			setLoading(false);
		}).catch(err => {
			console.log(err);
			setLoading(false);
		})
	}

	const handleReplyMessage = (item) => {
		if(type != 'inbox') return;

		setSelectedMessage(item);
	}

	const handleSelectItem = (item) => {
		const { id } = item;

		let _checkedIds = [...checkedIds];
		let _index = _checkedIds.indexOf(id);
		if(_index > -1)	_checkedIds.splice(_index, 1);
		else _checkedIds.push(id);

		if(_checkedIds.length === 0) onChangeCheckStatus('none');
		else if(_checkedIds.length === messages.length) onChangeCheckStatus('all');
		else {
			onChangeCheckStatus('some');
			setCheckedIds(_checkedIds);
		}
	}

	const deleteSelection = () => {
		onChangeCheckStatus('none');

		if(!checkedIds.length) return;
		
		deleteMessages(checkedIds).then(res => {
			setOffset(0);
			updateMessages(0);
		}).catch(err => {
			console.log(err);
		});
	}

	if (messages.length === 0) {
		return (
			<FuseAnimate delay={100}>
				<div className="flex flex-1 items-center justify-center h-full">
					<Typography color="textSecondary" variant="h5">
						{t('NO_MESSAGES')}
					</Typography>
				</div>
			</FuseAnimate>
		);
	}

	return (
		<>
			<PerfectScrollbar onYReachEnd={handleReachBottom}>
				<List className="p-0">
					<FuseAnimateGroup
						enter={{
							animation: 'transition.slideUpBigIn'
						}}
					>
						{messages.map(m => (
							<MailListItem
								mail={m}
								key={m.id}
								checked={checkedIds.includes(m.id)}
								onReply={handleReplyMessage}
								onSelect={handleSelectItem}
								replyable={type === 'inbox'}/>
						))}
					</FuseAnimateGroup>
				</List>
			</PerfectScrollbar>

			{!!selectedMessage && <MessageDlg open={!!selectedMessage} title="Reply Message" to={selectedMessage.sender} mail={selectedMessage} onClose={() => setSelectedMessage(null)} />	}
		</>
	);
}

export default withRouter(MailList);
