import React, {useState, useEffect} from 'react';

import FusePageSimple from '@fuse/core/FusePageSimple';

import TeamsHeader from './component/TeamsHeader';
import TeamsContent from './component/TeamsContent';
import AlertDlg from 'app/components/AlertDlg';
import TeamDlg from 'app/components/TeamDlg';
import { getAllTeams, deleteTeam } from 'app/services/team_api';

const TeamList = () => {
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

		getAllTeams({search}).then(res => {
			let _teams = res.data.teams;

			setData(_teams);
			
			setLoading(false);
		}).catch(err => {
			setLoading(false);
		});
	}

	const handleChangeTeamStatus = (teamId, type) => {
		if(type === 'edit') editTeam(teamId);
		else if(type === 'delete') setDeleteId(teamId);
	}

	const editTeam = (id) => {
		console.log(id);
	}

	const removeTeam = () => {
		let _data = [...data];
		let _team = _data.find(d => d.id === deleteId);
		
		setDeleteId(null);

		deleteTeam(_team.id).then(res => {
			let _index = _data.indexOf(_team);
			_data.splice(_index, 1);
			setData(_data);
		}).catch(err => {
			console.log(err);
		});
	}

	const handleCreatedTeam = (team) => {
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
				header={<TeamsHeader title="Teams" onChangeSearch={handleSearch} onCreateTeam={() => setOpenModal(true)}/>}
				content={<TeamsContent loading={loading} data={data} onChangeStatus={handleChangeTeamStatus}/>}
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
				onConfirm={removeTeam}/>

			{openModal && 
				<TeamDlg open={openModal} onClose={() => setOpenModal(false)} onCreatedTeam={handleCreatedTeam}/>
			}
		</>
	);
}

export default TeamList;
