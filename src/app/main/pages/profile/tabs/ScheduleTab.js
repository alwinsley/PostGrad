import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
	Fab,
	Icon,
	Button,
	Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import FuseAnimate from '@fuse/core/FuseAnimate/FuseAnimate';
import ScheduleWidget from 'app/components/ScheduleWidget';
import ScheduleDlg from 'app/components/ScheduleDlg';

import { checkAccess } from 'app/auth/authAcess';
import { getUserSchedules, deleteSchedule } from 'app/services/schedule_api';

const useStyles = makeStyles((theme) => ({
	addButton: {
		position: 'absolute',
		right: 12,
		bottom: 30,
		zIndex: 99
	}
}));

const ScheduleTab = ({profile}) => {
	const classes = useStyles();
	const me = useSelector(({ auth }) => auth.user);
	const [loading, setLoading] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const [data, setData] = useState([]);

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

	const onChangeStatus = (status) => {
		console.log(status)
	}

	const handleCreatedSchedule = () => {
		setOpenModal(false);
		refreshData();
	}

	// if(!checkAccess(me, 'SCHEDULE')){
	// 	return (
	// 		<FuseAnimate delay={100}>
	// 			<div className="text-center py-32">
	// 				<Typography color="textSecondary" variant="h5" className="mb-24">You have not access to here.</Typography>
	// 				<Typography color="textSecondary" className="mb-12">Please click this button to get access.</Typography>
	// 				<Button variant="contained" color="primary" href="/membership">Get Access</Button>
	// 			</div>
	// 		</FuseAnimate>
	// 	);
	// }

	return (
		<div className="md:flex max-w-2xl pb-36">
			<FuseAnimate animation='transition.slideUpBigIn' delay={100}>
				{data.length ? 
					<ScheduleWidget data={data} editable={me.role === 'ADMIN'} onTriggerAction={onChangeStatus}/>
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
					className={classes.addButton}
					onClick={() => setOpenModal(true)}
				>
					<Icon>add</Icon>
				</Fab>
			</FuseAnimate>

			{openModal && 
				<ScheduleDlg
					open={openModal}
					user={profile.id}
					editable={me.role === 'ADMIN'}
					onClose={() => setOpenModal(false)}
					onChanged={handleCreatedSchedule}/>
			}
		</div>
	);
}

export default ScheduleTab;
