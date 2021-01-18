import React, {useState, useEffect} from 'react';

import FusePageSimple from '@fuse/core/FusePageSimple';

import UsersHeader from './component/UsersHeader';
import UsersContent from './component/UsersContent';
import AlertDlg from 'app/components/AlertDlg';
import UserDlg from 'app/components/UserDlg';
import { GetProfiles, setRecruitUser, deleteUser } from 'app/services/profileService';


const CoachList = () => {
	const role = 'COACH';
	const [loading, setLoading] = useState(false);
	const [offset, setOffset] = useState(0);
	const [data, setData] = useState([]);
	const [ended, setEnded] = useState(false);
	const [search, setSearch] = useState('');
	const [openModal, setOpenModal] = useState(false);
	const [deleteId, setDeleteId] = useState(null);

	useEffect(() => {
		updatePageContent(0);
	}, [search]);

	const handleRequestMore = () => {
		if(ended || loading) return;
		updatePageContent(offset + 1);
	}

	const handleSearch = (search) => {
		setSearch(search);
	}

	const updatePageContent = (pageOffset) => {
		setLoading(true);

		GetProfiles({role, offset: pageOffset, search}).then(res => {
			let _profiles = res.data.profiles;

			if(pageOffset === 0) setData(_profiles);
			else setData([...data, ..._profiles]);
			
			if(res.data.isMore) {
				setOffset(pageOffset);
				setEnded(false);
			}else{
				setEnded(true);
			}

			setLoading(false);
		}).catch(err => {
			setLoading(false);
		});
	}

	const handleChangeUserStatus = (userId, type) => {
		if(type === 'delete') setDeleteId(userId);
	}

	const removeUser = () => {
		let _data = [...data];
		let _user = _data.find(d => d.id === deleteId);
		
		setDeleteId(null);

		deleteUser(_user.id).then(res => {
			let _index = _data.indexOf(_user);
			_data.splice(_index, 1);
			setData(_data);
		}).catch(err => {
			console.log(err);
		});
	}

	const handleCreatedUser = (user) => {
		setOpenModal(false);
		setOffset(0);
		updatePageContent(0);
	}

	return (
		<>
			<FusePageSimple
				classes={{
					contentWrapper: 'p-0 h-full overflow-hidden',
					content: 'flex flex-col h-full',
					leftSidebar: 'w-256 border-0',
					header: 'min-h-72 h-72',
					wrapper: 'min-h-0'
				}}
				header={<UsersHeader title="Coaches" onChangeSearch={handleSearch} onCreateUser={() => setOpenModal(true)}/>}
				content={<UsersContent loading={loading} data={data} onReachBottom={handleRequestMore} onChangeStatus={handleChangeUserStatus}/>}
				sidebarInner
				innerScroll
			/>

			<AlertDlg
				open={!!deleteId}
				type="warning"
				text="Are you sure to delete?"
				subtext="you can't recover it"
				confirmText="Yes, Delete"
				onClose={() => setDeleteId(null)}
				onConfirm={removeUser}/>

			{openModal && 
				<UserDlg open={openModal} type={role} onClose={() => setOpenModal(false)} onCreatedUser={handleCreatedUser}/>
			}
		</>
	);
}

export default CoachList;
