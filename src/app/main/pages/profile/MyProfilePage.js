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
import TranscriptTab from './mytabs/TranscriptTab';

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
	phone: "",
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
	sat: ""
}

const MyProfilePage = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const user = useSelector(({ auth }) => auth.user);
	const [profile, setProfile] = useState(defaultData);
	const [oldResources, setOldResources] = useState([]);
	const [resources, setResources] = useState([]);
	const [errors, setErrors] = useState({});
	const [selectedTab, setSelectedTab] = useState(0);

	useEffect(() => {
		getMyProfile().then(res => {
			let _profile = res.data.profile;
			delete _profile.avatar;
			setProfile(_profile);
			setOldResources(res.data.resources);
		}).catch(err => {
			console.log(err);
		});
	}, [])

	const handleTabChange = (event, value) => {
		setSelectedTab(value);
	}

	const handleFieldChange = (e) => {
		const {id, value} = e.target;

		setProfile({...profile, [id]: value});
	}

	const handleRSAdd = (files, type) => {
		if(type === 'LINK'){
			let _links = buildResource(files, 'VIDEO', profile.id);
			setResources([..._links, ...resources]);
			return;
		}

		let formdata = new FormData();

		_.forEach(files, (file, key) => {
			formdata.append('file', file);
		})

		uploadResources(formdata).then(res => {
			let _files = buildResource(res.data.filepath, type, profile.id);
			setResources([..._files, ...resources]);
		}).catch(err => {
			console.log(err);
		})
	}

	const handleRSEdit = (data) => {
		let _data = {
			description: data.description,
			highlight: data.highlight,
			workout: data.workout
		};

		if(data.id){
			updateResource(data.id, _data).then(res => {
				let _resources = [...oldResources];
				_resources[data.index] = res.data.resource;
				setOldResources(_resources);
			}).catch(err => {
				console.log(err);
			});
		}else{
			let _resources = [...resources];
			_resources[data.index] = {..._resources[data.index], ..._data};
			setResources(_resources);
		}
	}

	const handleRSDelete = (id, index) => {
		if(id){
			deleteResource(id).then(res => {
				let _resources = [...oldResources];
				_resources.splice(index, 1);
				setOldResources(_resources);
			}).catch(err => {
				alert('error occuorred');
			})
		}else{
			let _resources = [...resources];
			_resources.splice(index, 1);
			setResources(_resources);
		}
	}

	const handleSubmit = () => {
		postProfile({profile, resources}).then(res => {
			let _profile = res.data.profile;
			delete _profile.avatar;
			setProfile(_profile);
			setOldResources(res.data.resources);
			setResources([]);
		}).catch(err => {
			console.log(err)
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
					<Tab classes={{	root: 'h-64' }}	label="Transcript & Eligibility"/>
					{/* <Tab classes={{	root: 'h-64' }}	label="Highlights"/> */}
					{/* <Tab classes={{	root: 'h-64' }}	label="Workouts"/> */}
				</Tabs>
			}
			content={
				<div className="p-16 sm:p-24">
					{selectedTab === 0 && <InfoTab profile={profile} errors={errors} handleFieldChange={handleFieldChange}/>}
					{selectedTab === 1 && <AboutTab profile={profile} errors={errors} handleFieldChange={handleFieldChange}/>}
					{selectedTab === 2 && <PhotosTab oldResources={oldResources} resources={resources} onAddRS={handleRSAdd} onDeleteRS={handleRSDelete} onEditRS={handleRSEdit}/>}
					{selectedTab === 3 && <VideosTab oldResources={oldResources} resources={resources} onAddRS={handleRSAdd} onDeleteRS={handleRSDelete} onEditRS={handleRSEdit}/>}
					{selectedTab === 4 && <TranscriptTab profile={profile}/>}
					{/* {selectedTab === 4 && <SpecialTab oldResources={oldResources} resources={resources} onAddRS={handleRSAdd} onDeleteRS={handleRSDelete} onEditRS={handleRSEdit} tabType="HIGHLIGHT"/>} */}
					{/* {selectedTab === 5 && <SpecialTab oldResources={oldResources} resources={resources} onAddRS={handleRSAdd} onDeleteRS={handleRSDelete} onEditRS={handleRSEdit} tabType="WORKOUT"/>} */}
				</div>
			}
		/>
	);
}

export default MyProfilePage;
