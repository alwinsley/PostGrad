import React, {useState, useEffect} from 'react';
import moment from 'moment';
import FusePageSimple from '@fuse/core/FusePageSimple';

import FavoritesHeader from './component/FavoritesHeader';
import FavoritesContent from './component/FavoritesContent';
import { GetFavorites, UpdateFavorite } from 'app/services/profileService';

const Favorites = () => {
	const role = 'PLAYER';
	const [loading, setLoading] = useState(false);
	const [offset, setOffset] = useState(0);
	const [data, setData] = useState([]);
	const [ended, setEnded] = useState(false);
	const [search, setSearch] = useState('');
	const [filters, setFilters] = useState({});
	const [openModal, setOpenModal] = useState(false);
	const [deleteId, setDeleteId] = useState(null);

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

	const updatePageContent = (pageOffset) => {
		setLoading(true);

		GetFavorites({role, offset: pageOffset, search}).then(res => {
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

	const handleChangeUserStatus = (user, type) => {
		const data = {
			favorited_id: user.id,
			favorite: type === 'faovrite' ? 1 : 0
		}

		UpdateFavorite(data).then(res => {
			updatePageContent(0);
		}).catch(err => {
			console.log(err);
		})
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
				header={<FavoritesHeader title="Favorites" onChangeSearch={handleSearch} onCreateUser={() => setOpenModal(true)}/>}
				content={
					<FavoritesContent
						loading={loading}
						data={data}
						onReachBottom={handleRequestMore}
						onChangeStatus={handleChangeUserStatus}
					/>}
				sidebarInner
				innerScroll
			/>
		</>
	);
}

export default Favorites;
