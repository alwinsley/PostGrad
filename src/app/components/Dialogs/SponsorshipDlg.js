import React, { useState } from 'react';
import {
	AppBar,
	Button,
	Dialog,
	Typography,
	Toolbar,
	TextField
} from '@material-ui/core';

import ClickUploader from '../ClickUploader';
import { isValidURL } from 'app/helpers/functions';
import { postSponsorship } from 'app/services/sponsorship_api';

const SponsorshipDlg = ({open, title, onClose, onCreatedSponsorship, ...props}) => {
	const [data, setData] = useState({});
	const [errors, setErrors] = useState({});
	const [selectedFile, setSelectedFile] = useState(null);

	const handleChangeField = (e) => {
		const {id, value} = e.target;
		if(id === 'link'){
			setErrors({...errors, link: !value || isValidURL(value) ? '' : 'invalid url' });
		}
		setData({...data, [id]: value});
	}

	const handleChangeFile = (files) => {
		setSelectedFile({
			file: files[0],
			preview: URL.createObjectURL(files[0])
		});
	}

	const canBeSave = () => {
		if(!selectedFile || !data.link || errors.link) return false;
		return true;
	}

	const handleSubmit = () => {
		let _formData = new FormData();

		_formData.append('description', data.link);
		if(selectedFile.file) _formData.append('file', selectedFile.file);

		postSponsorship(_formData).then(res => {
			onCreatedSponsorship();
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
					<Typography variant="subtitle1" color="inherit">{title}</Typography>
				</Toolbar>
			</AppBar>

			<div className="p-20">
				<ClickUploader
					preview={selectedFile ? selectedFile.preview : null}
					accept="image/*"
					text="Select Image"
					allows="( jpg, png, svg, gif )"
					onChange={handleChangeFile}
				/>

				<TextField
					className="my-10"
					id="link"
					error={!!errors.link}
					helperText={errors.link}
                    fullWidth
                    label="Link"
                    variant="outlined"
					value={data.link}
					placeholder="https://example.com"
                    onChange={handleChangeField}
                />

				<div className="flex justify-evenly px-8 py-16 sm:px-16">
					<Button variant="contained" color="primary" type="submit" disabled={!canBeSave()} value="legacy" onClick={handleSubmit}>Save</Button>
					<Button variant="outlined" color="primary" onClick={onClose}>Cancel</Button>
				</div>
			</div>
		</Dialog>
	);
}

export default SponsorshipDlg;
