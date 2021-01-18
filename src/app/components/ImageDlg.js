import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	AppBar,
	Button,
	Dialog,
	Icon,
	Typography,
	Toolbar,
	TextField
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import LinkUploader from './LinkUploader';
import { postSponsorship } from 'app/services/sponsorship_api';

const defaultSponsorship = {
	title: '',
	description: ''
}

const useStyles = makeStyles((theme) => ({
	root: {
		padding: 24,
		'& .MuiTextField-root': {
			margin: '12px 0',
		},
	},
	fakelogo: {
		opacity: 0.5,
		height: '120px',
        width: 'auto'
	},
	logo: {
		height: '120px',
        width: 'auto'
	},
    uploadBtn: {
		width: '100%',
		margin: '12px 0',
		padding: '12px 16px',
		borderRadius: '4px',
		color: '#fff',
		backgroundColor: '#1976d2',
		textAlign: 'center',
		boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)'
    },
}));

const ImageDlg = ({open, title, onClose, onCreatedSponsorship, ...props}) => {
	const classes = useStyles();
	// const [sponsorship, setSponsorship] = useState(defaultSponsorship);
	const [selectedFile, setSelectedFile] = useState(null);

	// const handleChangeField = (e) => {
	// 	const {id, value} = e.target;
	// 	setSponsorship({...sponsorship, [id]: value});
	// }

	const handleChangeFile = (files) => {
		setSelectedFile({
			file: files[0],
			preview: URL.createObjectURL(files[0])
		});
	}

	const handleChangeLink = (link) => {
		setSelectedFile({
			preview: link
		});
	}

	const canBeSave = () => {
		if(!selectedFile) return false;
		return true;
	}

	const handleSubmit = () => {
		let _formData = new FormData();

		// _formData.append('sponsorship_name', sponsorship.sponsorship_name);
		if(selectedFile.file){
			_formData.append('file', selectedFile.file);
		}else{
			_formData.append('image', selectedFile.preview);
		}

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

			<div className={classes.root}>

				<LinkUploader preview={selectedFile ? selectedFile.preview : null} accept="image/*" onChangeFile={handleChangeFile} onChangeLink={handleChangeLink}/>

				{/* <TextField
                    id="title"
                    fullWidth
                    label="Title"
                    variant="outlined"
                    value={sponsorship.title}
                    onChange={handleChangeField}
                    />

				<TextField
                    id="description"
                    fullWidth
					label="Description"
					multiline
					rows={5}
                    variant="outlined"
                    value={sponsorship.description}
                    onChange={handleChangeField}
                    /> */}

				<div className="flex justify-evenly px-8 pt-12 sm:px-16">
					<Button variant="contained" color="primary" type="submit" disabled={!canBeSave()} value="legacy" onClick={handleSubmit}>Save</Button>
					<Button variant="outlined" color="primary" onClick={onClose}>Cancel</Button>
				</div>
			</div>
		</Dialog>
	);
}

export default ImageDlg;
