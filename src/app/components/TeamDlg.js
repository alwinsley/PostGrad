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

import { postTeam } from 'app/services/team_api';

const defaultTeam = {
	team_name: '',
	team_logo: ''
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

const TeamDlg = ({open, onClose, onCreatedTeam, ...props}) => {
	const classes = useStyles();
	const [team, setTeam] = useState(defaultTeam);
	const [selectedFile, setSelectedFile] = useState(null);

	const handleChangeField = (e) => {
		const {id, value} = e.target;
		setTeam({...team, [id]: value});
	}

	const handleChangeFile = (e) => {
		const { files } = e.target;

		if(!files.length) return;

		setSelectedFile({
			file: files[0],
			preview: URL.createObjectURL(files[0])
		});
	}

	const canBeSave = () => {
		if(!team.team_name || !selectedFile) return false;
		return true;
	}

	const handleSubmit = () => {
		let _formData = new FormData();

		_formData.append('team_name', team.team_name);
		_formData.append('team_logo', selectedFile.file);

		postTeam(_formData).then(res => {
			onCreatedTeam();
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
						Create New Team
					</Typography>
				</Toolbar>
			</AppBar>

			<div className={classes.root}>
				<div className="flex justify-center py-20">
					{selectedFile ? 
						<img className={classes.logo} src={selectedFile.preview}/>
					:
						<img className={classes.fakelogo} src='/assets/images/dummy-logo.png'/>
					}
				</div>

				<label htmlFor="logo">
					<input type="file" id="logo" hidden onChange={handleChangeFile}/>
					<div className={classes.uploadBtn}>Click and Upload</div>
				</label>

				<TextField
                    id="team_name"
                    fullWidth
                    label="Name"
                    variant="outlined"
                    value={team.team_name}
                    onChange={handleChangeField}
                    />

				{/* <TextField
                    id="team_logo"
                    fullWidth
                    label="Team Logo"
                    variant="outlined"
                    value={team.team_logo}
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

export default TeamDlg;
