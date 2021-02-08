import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';

import AboutTab from './tabs/AboutTab';
import PhotosTab from './tabs/PhotosTab';
import VideosTab from './tabs/VideosTab';
import SpecialTab from './tabs/SpecialTab';
import InfoTab from './tabs/InfoTab';
import ScheduleTab from './tabs/ScheduleTab';
import TranscriptTab from './tabs/TranscriptTab';

import MessageDlg from 'app/components/MessageDlg';

import { getProfile } from '../../../services/profileService';
import { asset_path } from '../../../helpers/resource';

const useStyles = makeStyles(theme => ({
	layoutHeader: {
		height: 200,
		minHeight: 200,
		[theme.breakpoints.down('md')]: {
			height: 240,
			minHeight: 240
		}
	}
}));

const defaultData = {
	name: "",
	email: "",
	phone: "",
	city: "",
	state: " ",
	zipcode: " ",
	twitter: " ",
	description: " ",
	current_school: " ",
	year: " ",
	position: " ",
	height: " ",
	weight: " ",
	hs_college: " ",
	act: " ",
	sat: " "
}

function ProfilePage(props) {
	const classes = useStyles();
	const me = useSelector(({ auth }) => auth.user);
	const [profile, setProfile] = useState(defaultData);
	const [resources, setResources] = useState([]);
	const [selectedTab, setSelectedTab] = useState(0);
	const [messageModal, setMessageModal] = useState(false);

	useEffect(() => {
		const { match: { params } } = props;
		if(!params.id) return;

		getProfile(params.id).then(res => {
			setProfile(res.data.profile);
			setResources(res.data.resources);
		}).catch(err => {
			console.log(err);
		});
	}, [])

	function handleTabChange(event, value) {
		setSelectedTab(value);
	}

	const handleGoback = () => {
		console.log(props);
		if(profile.role === 'PLAYER') props.history.push('/players');
		else props.history.push('/coaches');

	}

	return (
		<>
			<FusePageSimple
				classes={{
					header: classes.layoutHeader,
					toolbar: 'px-16 sm:px-24'
				}}
				header={
					<div className="p-24 flex flex-1 flex-col items-center justify-center md:flex-row md:items-end">
						<div className="flex flex-1 flex-col items-center justify-center md:flex-row md:items-center md:justify-start">
							<FuseAnimate animation="transition.expandIn" delay={300}>
								<Avatar
									className="w-96 h-96"
									alt="user photo"
									src={ profile && profile.avatar	? asset_path(profile.avatar) : 'assets/images/avatars/profile.jpg'	}
								/>
							</FuseAnimate>
							<FuseAnimate animation="transition.slideLeftIn" delay={300}>
								<Typography
									className="md:mx-24 text-24 md:text-32 my-8 md:my-0"
									variant="h4"
									color="inherit"
								>
									{profile.name}
								</Typography>
							</FuseAnimate>
						</div>

						<div className="flex items-center justify-end">
							<FuseAnimate animation="transition.slideRightIn" delay={300}>
								<div>
									<Button
										className="whitespace-nowrap normal-case"
										variant="outlined"
										color="secondary"
										// disabled={!canBeSubmitted()}
										onClick={() => setMessageModal(true)}
									>
										Send Message
									</Button>&nbsp;&nbsp;
									<Button
										className="whitespace-nowrap normal-case"
										variant="contained"
										onClick={handleGoback}
									>
										Back
									</Button>
								</div>
							</FuseAnimate>
						</div>
					</div>
				}
				contentToolbar={
					<Tabs
						value={selectedTab}
						onChange={handleTabChange}
						indicatorColor="primary"
						textColor="primary"
						variant="scrollable"
						scrollButtons="off"
						classes={{
							root: 'h-64 w-full'
						}}
					>
						<Tab classes={{	root: 'h-64' }}	label="Information"/>
						<Tab classes={{	root: 'h-64' }}	label="Photos"/>
						<Tab classes={{	root: 'h-64' }}	label="Videos"/>
						{me.role !== 'PLAYER' && 
							<Tab classes={{	root: 'h-64' }}	label={profile.role === 'PLAYER' ? "Schedules": "Camp Dates/Season Schedule"}/>
						}
						{me.role !== 'PLAYER' && profile && profile.role === 'PLAYER' &&
							<Tab classes={{ root: 'h-64' }} label="Transcript & Eligibility"/>
						}
					</Tabs>
				}
				content={
					<div className="p-16 sm:p-24">
						{selectedTab === 0 && <InfoTab profile={profile}/>}
						{selectedTab === 1 && <PhotosTab resources={resources}/>}
						{selectedTab === 2 && <VideosTab resources={resources}/>}
						{selectedTab === 3 && <ScheduleTab profile={profile}/>}
						{selectedTab === 4 && profile && profile.role === 'PLAYER' && <TranscriptTab profile={profile}/>}
					</div>
				}
			/>

			{messageModal && <MessageDlg open={messageModal} title="Send Message" to={profile} onClose={() => setMessageModal(false)}/> }
		</>
	);
}

export default ProfilePage;
