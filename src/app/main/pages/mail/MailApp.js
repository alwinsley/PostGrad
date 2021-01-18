import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';

import FusePageCarded from '@fuse/core/FusePageCarded';

import MailDetails from './mail/MailDetails';
import MailToolbar from './mail/MailToolbar';
import MailAppHeader from './MailAppHeader';
import MailAppSidebarContent from './MailAppSidebarContent';
import MailAppSidebarHeader from './MailAppSidebarHeader';
import MailList from './mails/MailList';
import MailsToolbar from './mails/MailsToolbar';

function MailApp(props) {
	const pageLayout = useRef(null);
	const routeParams = useParams();
	const [searchText, setSearchText] = useState('');
	const [checkstatus, setCheckstatus] = useState('none');
	const [isDeleting, setIsDeleting] = useState(false);

	const handleChangeStatus = (status) => {
		setCheckstatus(status);
		setIsDeleting(false);
	}

	return (
		<FusePageCarded
			classes={{
				root: 'w-full',
				content: 'flex flex-col overflow-hidden',
				header: 'items-center min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={<MailAppHeader pageLayout={pageLayout} onChangeSearch={(text) => setSearchText(text)}/>}
			contentToolbar={routeParams.id ? <MailToolbar /> : <MailsToolbar checkstatus={checkstatus} onChangeSelectAll={(status) => setCheckstatus(status)} onDelete={() => setIsDeleting(true)}/>}
			content={routeParams.id ? <MailDetails /> : <MailList checkstatus={checkstatus} searchText={searchText} isDeleting={isDeleting} onChangeCheckStatus={handleChangeStatus}/>}
			leftSidebarHeader={<MailAppSidebarHeader />}
			leftSidebarContent={<MailAppSidebarContent />}
			ref={pageLayout}
			innerScroll
		/>
	);
}

export default MailApp;
