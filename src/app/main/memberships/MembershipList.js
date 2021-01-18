import React, {useState, useEffect} from 'react';

import FusePageSimple from '@fuse/core/FusePageSimple';

import MembershipHeader from './component/MembershipHeader';
import MembershipContent from './component/MembershipContent';
import AlertDlg from 'app/components/AlertDlg';
import { getPermissions } from 'app/services/permission_api';

const MembershipList = () => {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const [memberships, setMemberships] = useState([]);
	const [permissions, setPermissions] = useState([]);
	const [deleteId, setDeleteId] = useState(null);

	useEffect(() => {
		updatePageContent();
	}, []);

	const updatePageContent = () => {
		setLoading(true);

		getPermissions().then(res => {
			let data = res.data;

			setMemberships(data.memberships);
			setPermissions(data.permissions);
			
			setLoading(false);
		}).catch(err => {
			setLoading(false);
		});
	}

	const handleChangeTeamStatus = (membershipId, type) => {
		console.log(type);
	}

	return (
		<>
			<FusePageSimple
				classes={{
					contentWrapper: 'p-0 h-full',
					content: 'flex flex-col h-full',
					leftSidebar: 'w-256 border-0',
					header: 'min-h-72 h-72',
					wrapper: 'min-h-0'
				}}
				header={<MembershipHeader title="Memberships"/>}
				content={<MembershipContent loading={loading} memberships={memberships} permissions={permissions} onChangeStatus={handleChangeTeamStatus}/>}
				sidebarInner
				innerScroll
			/>
			
			{/* <AlertDlg
				open={!!deleteId}
				type="warning"
				text="Are you sure to delete?"
				subtext="you can't recover it"
				confirmText="Yes, Delete"
				onClose={() => setDeleteId(null)}
				onConfirm={removeTeam}/> */}
		</>
	);
}

export default MembershipList;
