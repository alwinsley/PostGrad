import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from '@lodash';

import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageSimple from '@fuse/core/FusePageSimple';
import {
	Avatar,
	Button,
	Typography,
	Icon,
	Grid,
	TextField
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { updateUserAvatar } from '../../../auth/store/userSlice';
import jwtService from 'app/services/jwtService';
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
	password: '',
	new_password: '',
	confirm_password: ''
}

const SecurityPage = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const user = useSelector(({ auth }) => auth.user);
	const [profile, setProfile] = useState(defaultData);
	const [errors, setErrors] = useState({password: 'Min character length is 4'});

	const handleFieldChange = (e) => {
		const {id, value} = e.target;

		if(value.length < 4) setErrors({...errors, [id]: 'Min character lengh is 4'});
		else setErrors({...errors, [id]: null});

		setProfile({...profile, [id]: value});
	}

	const handleSubmit = () => {
		jwtService.resetUserPassword(profile).then(res => {
			jwtService.setSession(res.data.access_token);
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

	const canbeSubmit = () => {
		if(!profile.password || !profile.new_password || !profile.confirm_password) return false;
		if(errors.password || errors.new_password || errors.confirm_password) return false;

		if(profile.new_password !== profile.confirm_password) return false;

		return true;
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

					{/* <div className="flex items-center justify-end">
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
					</div> */}
				</div>
			}
			content={
				<div className="p-16 sm:p-24">
					<Grid item sm={12} md={6}>
						<TextField
							className="mt-8 mb-16"
							error={!!errors.password}
							required
							label="Current Password"
							autoFocus
							id="password"
							name="password"
							value={profile.password}
							onChange={handleFieldChange}
							variant="outlined"
							fullWidth
							type="password"
							helperText={errors.password}
						/>
					</Grid>
					<Grid item sm={12} md={6}>
						<TextField
							className="mt-8 mb-16"
							error={!!errors.new_password}
							required
							label="New Password"
							id="new_password"
							name="new_password"
							value={profile.new_password}
							onChange={handleFieldChange}
							variant="outlined"
							fullWidth
							type="password"
							helperText={errors.new_password}
						/>
					</Grid>
					<Grid item sm={12} md={6}>
						<TextField
							className="mt-8 mb-16"
							error={!!errors.confirm_password}
							required
							label="Confirm Password"
							id="confirm_password"
							name="confirm_password"
							value={profile.confirm_password}
							onChange={handleFieldChange}
							variant="outlined"
							fullWidth
							type="password"
							helperText={errors.confirm_password}
						/>
					</Grid>
					<Grid item sm={12} md={6}>
						<Button variant="contained" color="primary" style={{padding: '12px'}} disabled={!canbeSubmit()} fullWidth onClick={handleSubmit}>
							Reset Password
						</Button>
					</Grid>
				</div>
			}
		/>
	);
}

export default SecurityPage;
