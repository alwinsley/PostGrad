import React, {useState, useEffect} from 'react';
import moment from 'moment';
import FusePageSimple from '@fuse/core/FusePageSimple';

import UsersHeader from './component/UsersHeader';
import UsersContent from './component/UsersContent';
import AlertDlg from 'app/components/AlertDlg';
import UserDlg from 'app/components/UserDlg';
import { GetProfiles, setRecruitUser, deleteUser, UpdateFavorite, GetFavoriteList } from 'app/services/profileService';

const PlayerList = () => {
	const role = 'PLAYER';
	const [loading, setLoading] = useState(false);
	const [offset, setOffset] = useState(0);
	const [data, setData] = useState([]);
	const [ended, setEnded] = useState(false);
	const [search, setSearch] = useState('');
	const [filters, setFilters] = useState({});
	const [openModal, setOpenModal] = useState(false);
	const [deleteId, setDeleteId] = useState(null);
	const [favorites, setFavorites] = useState([]);

	useEffect(() => {
		GetFavoriteList().then(res => {
			let fav_list = res.data.favorites;
			if(fav_list.length){
				fav_list = fav_list.map(fav => {
					return fav.favorited_id
				});
				setFavorites(fav_list);
			}
		}).catch(err => {
			console.log(err);
		});
	}, []);
	
	useEffect(() => {
		updatePageContent(0);
	}, [search, filters]);

	const handleRequestMore = () => {
		if(ended || loading) return;
		updatePageContent(offset + 1);
	}

	const handleSearch = (search) => {
		setSearch(search);
	}

	const handleFilter = (filters) => {
		setFilters(filters);
	}

	const updatePageContent = (pageOffset) => {
		setLoading(true);

		let _filters = {...filters};
		if(_filters.year) {
			_filters = {..._filters, year: _filters.year.year().toString()}
		}

		GetProfiles({role, offset: pageOffset, search, ..._filters}).then(res => {
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
		if(type === 'recruit') changeRecruit(userId);
		else if(type === 'delete') setDeleteId(userId);
		else if(type === 'favorite') setFavorite(userId, true);
		else if(type === 'unfavorite') setFavorite(userId, false);
	}

	const setFavorite = (userId, status) => {
		UpdateFavorite({favorited_id: userId, status}).then(res => {
			if(status) setFavorites([...favorites, userId]);
			else {
				let favlist = [...favorites];
				favlist.splice(favlist.indexOf(userId), 1);
				setFavorites(favlist);
			}
		}).catch(err => {
			console.log(err);
		})
	}

	const changeRecruit = (id) => {
		let _data = [...data];
		let _user = _data.find(d => d.id === id);
		let is_top = _user.is_top ? 0 : 1;

		setRecruitUser(id, {is_top}).then(res => {
			let _index = _data.indexOf(_user);
			_user.is_top = is_top;
			_data.splice(_index, 1, _user);
			setData(_data);
		}).catch(err => {
			console.log(err);
		});
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
					content: 'flex flex-col h-full pb-32',
					leftSidebar: 'w-256 border-0',
					header: 'min-h-72 h-72',
					wrapper: 'min-h-0'
				}}
				header={<UsersHeader title="Players" onChangeSearch={handleSearch} onCreateUser={() => setOpenModal(true)}/>}
				content={
					<UsersContent
						loading={loading}
						data={data}
						filterable
						favorites={favorites}
						onReachBottom={handleRequestMore}
						onChangeStatus={handleChangeUserStatus}
						onChangeFilter={handleFilter}
					/>}
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

export default PlayerList;
