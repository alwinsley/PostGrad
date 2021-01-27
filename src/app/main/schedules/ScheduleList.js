import React, {useState, useEffect} from 'react';

import FusePageSimple from '@fuse/core/FusePageSimple';

import SchedulesHeader from './component/SchedulesHeader';
import SchedulesContent from './component/SchedulesContent';
import AlertDlg from 'app/components/AlertDlg';
import ScheduleDlg from 'app/components/ScheduleDlg';
import { getSchedules, deleteSchedule } from 'app/services/schedule_api';

const ScheduleList = () => {
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

		getSchedules({search}).then(res => {
			let _schedules = res.data.schedules;

			setData(_schedules);
			
			setLoading(false);
		}).catch(err => {
			setLoading(false);
		});
	}

	const handleChangeScheduleStatus = (scheduleId, type) => {
		if(type === 'edit') editSchedule(scheduleId);
		else if(type === 'Delete') setDeleteId(scheduleId);
	}

	const editSchedule = (id) => {
		console.log(id);
	}

	const removeSchedule = () => {
		let _data = [...data];
		let _schedule = _data.find(d => d.id === deleteId);
		
		setDeleteId(null);

		deleteSchedule(_schedule.id).then(res => {
			let _index = _data.indexOf(_schedule);
			_data.splice(_index, 1);
			setData(_data);
		}).catch(err => {
			console.log(err);
		});
	}

	const handleCreatedSchedule = (schedule) => {
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
				header={<SchedulesHeader title="Schedules" onChangeSearch={handleSearch} onCreateSchedule={() => setOpenModal(true)}/>}
				content={<SchedulesContent loading={loading} data={data} onChangeStatus={handleChangeScheduleStatus}/>}
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
				onConfirm={removeSchedule}/>

			{openModal && 
				<ScheduleDlg open={openModal} editable={true} onClose={() => setOpenModal(false)} onChanged={handleCreatedSchedule}/>
			}
		</>
	);
}

export default ScheduleList;
