import React, {useState} from 'react';

import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';

import reducer from '../store';
import PlayersHeader from './PlayersHeader';
import PlayersTable from './PlayersTable';

const Players = () => {
	
	const [messageModal, setMessageModal] = useState(false);

	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				contentCard: 'overflow-hidden',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={<PlayersHeader handleModal={setMessageModal} isModal={messageModal}/>}
			content={<PlayersTable handleModal={setMessageModal} isModal={messageModal}/>}
			innerScroll
		/>
	);
}

export default withReducer('UsersPage', reducer)(Players);
