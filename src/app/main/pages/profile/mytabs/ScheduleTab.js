import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
	Fab,
	Icon,
	Typography
} from '@material-ui/core';

import FuseAnimate from '@fuse/core/FuseAnimate/FuseAnimate';
import ScheduleWidget from 'app/components/ScheduleWidget';
import ScheduleDlg from 'app/components/Dialogs/ScheduleDlg';
import AlertDlg from 'app/components/AlertDlg';

import { getUserSchedules, deleteSchedule } from 'app/services/schedule_api';

const ScheduleTab = ({profile}) => {
	const me = useSelector(({ auth }) => auth.user);
	const [loading, setLoading] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const [data, setData] = useState([]);
	const [deleteId, setDeleteId] = useState(null);
	const [selected, setSelected] = useState(null);

	useEffect(() => {
		refreshData();
	}, []);

	const refreshData = () => {
		setLoading(true);

		getUserSchedules(profile.id).then(res => {
			let _schedules = res.data.schedules;
			setData(_schedules);
		}).catch(err => {
			console.log(err);
		}).then(() => {
			setLoading(false);
		})
	}

	const onChangeStatus = (schedule, type) => {
		if(type === 'Edit') editSchedule(schedule);
		else if(type === 'Delete') setDeleteId(schedule.id);
	}

	const editSchedule = (schedule) => {
		setSelected(schedule);
		setOpenModal(true);
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

	const handleSuccessAction = () => {
		setOpenModal(false);
		setSelected(null);
		refreshData();
	}

	return (
		<div className="md:flex max-w-2xl pb-36">
			<FuseAnimate animation='transition.slideUpBigIn' delay={100}>
				{data.length ? 
					<ScheduleWidget data={data} editable onTriggerAction={onChangeStatus}/>
					:
					<div className="flex flex-1 items-center justify-center py-36">
						<Typography color="textSecondary" variant="h5">
							There are no schedules!
						</Typography>
					</div>
				}
			</FuseAnimate>

			<FuseAnimate animation="transition.expandIn" delay={500}>
				<Fab
					color="secondary"
					aria-label="add"
					className="fixed bottom-56 right-12 sm:bottom-76 sm:right-24"
					onClick={() => setOpenModal(true)}
				>
					<Icon>add</Icon>
				</Fab>
			</FuseAnimate>

			<AlertDlg
				open={!!deleteId}
				type="warning"
				text="Are you sure to delete?"
				subtext="you can't recover it"
				confirmText="Yes, Delete"
				onClose={() => setDeleteId(null)}
				onConfirm={removeSchedule}/>

			{openModal && 
				<ScheduleDlg
					open={openModal}
					user={profile.id}
					event={selected}
					onClose={() => setOpenModal(false)}
					onChanged={handleSuccessAction}/>
			}
		</div>
	);
}

export default ScheduleTab;
