import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FuseUtils from '@fuse/utils/FuseUtils';
import {
	AppBar,
	Button,
	Dialog,
	Icon,
	Typography,
	Toolbar,
	InputAdornment
} from '@material-ui/core';

import Formsy from 'formsy-react';
import { TextFieldFormsy } from '@fuse/core/formsy';
import { createUser } from 'app/services/profileService';


const UserDlg = ({open, type, onClose, onCreatedUser, ...props}) => {
	const register = useSelector(({ auth }) => auth.register);

	const [isFormValid, setIsFormValid] = useState(false);
	const formRef = useRef(null);

	useEffect(() => {
		if (register.error && (register.error.username || register.error.password || register.error.email)) {
			formRef.current.updateInputsWithError({
				...register.error
			});
			disableButton();
		}
	}, [register.error]);

	function disableButton() {
		setIsFormValid(false);
	}

	function enableButton() {
		setIsFormValid(true);
	}

	function handleSubmit(model) {
		createUser({...model, role: type}).then(res => {
			onCreatedUser();
		}).catch(err => {
			console.log(err);
		});
	}

	return (
		<Dialog
			open={open}
			onClose={onClose}
			fullWidth
			maxWidth="xs"
			component="form"
			classes={{ paper: 'rounded-8' }}
		>
			<AppBar position="static">
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						{type === 'PLAYER' ? 'Create New Player' : 'Create New Coach'}
					</Typography>
				</Toolbar>
			</AppBar>

			<div className="w-full p-24">
				<Formsy
					onValidSubmit={handleSubmit}
					onValid={enableButton}
					onInvalid={disableButton}
					ref={formRef}
					className="flex flex-col justify-center w-full"
				>
					<TextFieldFormsy
						className="mb-16"
						type="text"
						name="name"
						label="Name"
						validations={{
							minLength: 4
						}}
						validationErrors={{
							minLength: 'Min character length is 4'
						}}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<Icon className="text-20" color="action">
										person
									</Icon>
								</InputAdornment>
							)
						}}
						variant="outlined"
						required
					/>

					<TextFieldFormsy
						className="mb-16"
						type="text"
						name="email"
						label="Email"
						validations="isEmail"
						validationErrors={{
							isEmail: 'Please enter a valid email'
						}}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<Icon className="text-20" color="action">
										email
									</Icon>
								</InputAdornment>
							)
						}}
						variant="outlined"
						required
					/>

					<TextFieldFormsy
						className="mb-16"
						type="password"
						name="password"
						label="Password"
						validations="equalsField:password-confirm"
						validationErrors={{
							equalsField: 'Passwords do not match'
						}}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<Icon className="text-20" color="action">
										vpn_key
									</Icon>
								</InputAdornment>
							)
						}}
						variant="outlined"
						required
					/>

					<TextFieldFormsy
						className="mb-16"
						type="password"
						name="password-confirm"
						label="Confirm Password"
						validations="equalsField:password"
						validationErrors={{
							equalsField: 'Passwords do not match'
						}}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<Icon className="text-20" color="action">
										vpn_key
									</Icon>
								</InputAdornment>
							)
						}}
						variant="outlined"
						required
					/>

					<div className="flex justify-evenly px-8 sm:px-16">
						<Button variant="contained" color="primary" type="submit" disabled={!isFormValid} value="legacy">Save</Button>
						<Button variant="outlined" color="primary" onClick={onClose}>Cancel</Button>
					</div>
				</Formsy>
			</div>
		</Dialog>
	);
}

export default UserDlg;
