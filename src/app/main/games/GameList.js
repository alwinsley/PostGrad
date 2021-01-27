import React, {useState, useEffect} from 'react';

import FusePageSimple from '@fuse/core/FusePageSimple';

import GamesHeader from './component/GamesHeader';
import GamesContent from './component/GamesContent';
import AlertDlg from 'app/components/AlertDlg';
import GameDlg from 'app/components/GameDlg';
import { getAllGames, deleteGame } from 'app/services/game_api';

const GameList = () => {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const [search, setSearch] = useState('');
	const [openModal, setOpenModal] = useState(false);
	const [deleteId, setDeleteId] = useState(null);

	useEffect(() => {
		updatePageContent();
	}, [search]);

	const handleSearch = (search) => {
		setSearch(search);
	}

	const updatePageContent = () => {
		setLoading(true);

		getAllGames({search}).then(res => {
			let _games = res.data.games;

			setData(_games);
			
			setLoading(false);
		}).catch(err => {
			setLoading(false);
		});
	}

	const handleChangeGameStatus = (gameId, type) => {
		if(type === 'edit') editGame(gameId);
		else if(type === 'delete') setDeleteId(gameId);
	}

	const editGame = (id) => {
		console.log(id);
	}

	const removeGame = () => {
		let _data = [...data];
		let _game = _data.find(d => d.id === deleteId);
		
		setDeleteId(null);

		deleteGame(_game.id).then(res => {
			let _index = _data.indexOf(_game);
			_data.splice(_index, 1);
			setData(_data);
		}).catch(err => {
			console.log(err);
		});
	}

	const handleCreatedGame = (game) => {
		setOpenModal(false);
		updatePageContent();
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
				header={<GamesHeader title="Games" onChangeSearch={handleSearch} onCreateGame={() => setOpenModal(true)}/>}
				content={<GamesContent loading={loading} data={data} onChangeStatus={handleChangeGameStatus}/>}
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
				onConfirm={removeGame}/>

			{openModal && 
				<GameDlg open={openModal} onClose={() => setOpenModal(false)} onCreatedGame={handleCreatedGame}/>
			}
		</>
	);
}

export default GameList;
