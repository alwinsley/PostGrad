import React, {useState} from 'react';
import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';

import reducer from '../store';
import CoachesHeader from './CoachesHeader';
import CoachesTable from './CoachesTable';

const Coaches = () => {
	const [messageModal, setMessageModal] = useState(false);

	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				contentCard: 'overflow-hidden',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={<CoachesHeader handleModal={setMessageModal} isModal={messageModal}/>}
			content={<CoachesTable handleModal={setMessageModal} isModal={messageModal}/>}
			innerScroll
		/>
	);
}

export default withReducer('UsersPage', reducer)(Coaches);
