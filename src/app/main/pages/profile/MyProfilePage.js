import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from '@lodash';

import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageSimple from '@fuse/core/FusePageSimple';
import {
	Avatar,
	Button,
	Tab,
	Tabs,
	Typography,
	Icon,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import AboutTab from './mytabs/AboutTab';
import PhotosTab from './mytabs/PhotosTab';
import VideosTab from './mytabs/VideosTab';
import SpecialTab from './mytabs/SpecialTab';
import InfoTab from './mytabs/InfoTab';
import ScheduleTab from './mytabs/ScheduleTab';
import TranscriptTab from './mytabs/TranscriptTab';

import { showMessage } from 'app/store/fuse/messageSlice';
import { updateUserAvatar } from '../../../auth/store/userSlice';
import { uploadResources, updateResource, deleteResource, getMyProfile, postProfile } from '../../../services/profileService';
import { buildResource, asset_path } from '../../../helpers/resource';

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
	ncaa: "",
	city: "",
	state: "",
	zip: "",
	twitter: "",
	description: "",
	current_school: "",
	year: "",
	position: "",
	height: "",
	weight: "",
	hs_college: "",
	act: "",
	sat: "",
	hs_gpa: "",
	college_gpa:""
}

const MyProfilePage = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const user = useSelector(({ auth }) => auth.user);
	const [profile, setProfile] = useState(defaultData);
	const [resources, setResources] = useState([]);
	const [errors, setErrors] = useState({});
	const [selectedTab, setSelectedTab] = useState(0);

	useEffect(() => {
		getMyProfile().then(res => {
			let _profile = res.data.profile;
			delete _profile.avatar;
			setProfile(_profile);
			setResources(res.data.resources);
		}).catch(err => {
			console.log(err);
		});
	}, [])

	const handleTabChange = (event, value) => {
		setSelectedTab(value);
	}

	const handleFieldChange = (e) => {
		const {id, name, value} = e.target;
		const key = id || name;
		setProfile({...profile, [key]: value});
	}

	const handleRSAdd = (files, type) => {
		let formdata = new FormData();
		formdata.append('user_id', profile.id);
		if(type === 'LINK'){
			formdata.append('type', 'VIDEO');
			formdata.append('link', files[0]);
		}else{
			formdata.append('type', type);
			_.forEach(files, (file, key) => {
				formdata.append('file', file);
			})
		}

		uploadResources(formdata).then(res => {
			setResources([...res.data.resources, ...resources]);
			dispatch(showMessage({variant: 'success', message: 'resources uploaded successfully' }));
		}).catch(err => {
			dispatch(showMessage({variant: 'error', message: 'resources uploading failed' }));
			console.log(err);
		})
	}

	const handleRSEdit = (data) => {
		let _data = {
			description: data.description,
			highlight: data.highlight,
			workout: data.workout
		};

		updateResource(data.id, _data).then(res => {
			let _resources = [...resources];
			_resources[data.index] = res.data.resource;
			setResources(_resources);
		}).catch(err => {
			console.log(err);
		});
	}

	const handleRSDelete = (id, index) => {
		deleteResource(id).then(res => {
			let _resources = [...resources];
			_resources.splice(index, 1);
			setResources(_resources);
		}).catch(err => {
			alert('error occuorred');
		})
	}

	const handleSubmit = () => {
		postProfile(profile).then(res => {
			let _profile = res.data.profile;
			delete _profile.avatar;
			setProfile(_profile);
			dispatch(showMessage({variant: 'success', message: 'Profile updated successfully' }));
		}).catch(err => {
			console.log(err)
			dispatch(showMessage({variant: 'error', message: 'Invalid data' }));
		});
	}

	const handleUploadAvatar = (e) => {
		const { files } = e.target;
		if(!files[0]) return;

		let formdata = new FormData();
		formdata.append('avatar', files[0]);

		dispatch(updateUserAvatar(formdata));
	}

	return (
		<FusePageSimple
			classes={{
				header: classes.layoutHeader,
				toolbar: 'px-16 sm:px-24'
			}}
			header={
				<div className="p-24 flex flex-1 flex-col items-center justify-center md:flex-row md:items-end">
					<div className="flex flex-1 flex-col items-center justify-center md:flex-row md:items-center md:justify-start">
						<FuseAnimate animation="transition.expandIn" delay={300}>
							<div style={{position: 'relative'}}>
								<Avatar
									className="w-96 h-96"
									alt="user photo"
									src={ user.avatar && user.avatar !== ''	? asset_path(user.avatar) : 'assets/images/avatars/profile.jpg'	}
								/>
								<label	htmlFor="avatar-file" style={{position: 'absolute', right: '-15px', bottom: '-6px', cursor: 'pointer'}}>
									<input accept="image/*"	className="hidden" id="avatar-file"	type="file" onChange={handleUploadAvatar}/>
									<Icon>edit</Icon>
								</label>
							</div>
						</FuseAnimate>
						<FuseAnimate animation="transition.slideLeftIn" delay={300}>
							<Typography
								className="md:mx-24 text-24 md:text-32 my-8 md:my-0"
								variant="h4"
								color="inherit"
							>
								{user.name}
							</Typography>
						</FuseAnimate>
					</div>

					<div className="flex items-center justify-end">
						<FuseAnimate animation="transition.slideRightIn" delay={300}>
							<Button
								className="whitespace-nowrap normal-case"
								variant="contained"
								color="secondary"
								// disabled={!canBeSubmitted()}
								onClick={handleSubmit}
							>
								Save
							</Button>
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
					<Tab classes={{	root: 'h-64' }}	label="Personal Info"/>
					<Tab classes={{	root: 'h-64' }}	label="About Me"/>
					<Tab classes={{	root: 'h-64' }}	label="Photos"/>
					<Tab classes={{	root: 'h-64' }}	label="Videos"/>
					<Tab classes={{	root: 'h-64' }}	label={profile.role === 'PLAYER' ? "Schedules": "Camp Dates/Season Schedule"}/>
					{profile && profile.role === 'PLAYER' && <Tab classes={{	root: 'h-64' }}	label="Transcript & Eligibility"/> }
				</Tabs>
			}
			content={
				<div className="p-16 sm:p-24">
					{selectedTab === 0 && <InfoTab profile={profile} errors={errors} handleFieldChange={handleFieldChange}/>}
					{selectedTab === 1 && <AboutTab profile={profile} errors={errors} handleFieldChange={handleFieldChange}/>}
					{selectedTab === 2 && <PhotosTab resources={resources} onAddRS={handleRSAdd} onDeleteRS={handleRSDelete} onEditRS={handleRSEdit}/>}
					{selectedTab === 3 && <VideosTab resources={resources} onAddRS={handleRSAdd} onDeleteRS={handleRSDelete} onEditRS={handleRSEdit}/>}
					{selectedTab === 4 && <ScheduleTab profile={profile}/>}
					{selectedTab === 5 && profile && profile.role === 'PLAYER' && <TranscriptTab profile={profile}/>}
				</div>
			}
		/>
	);
}

export default MyProfilePage;
