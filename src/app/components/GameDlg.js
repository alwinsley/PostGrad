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

import ClickUploader from 'app/components/ClickUploader';
import { postGame } from 'app/services/game_api';

const defaultGame = {
	title: '',
	image: '',
	link: ''
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

const GameDlg = ({open, onClose, onCreatedGame, ...props}) => {
	const classes = useStyles();
	const [game, setGame] = useState(defaultGame);
	const [selectedFile, setSelectedFile] = useState(null);

	const handleChangeField = (e) => {
		const {id, value} = e.target;
		setGame({...game, [id]: value});
	}

	const handleChangeFile = (files) => {
		if(!files.length) return;

		setSelectedFile({
			file: files[0],
			preview: URL.createObjectURL(files[0])
		});
	}

	const canBeSave = () => {
		if(!game.title || !game.link || !selectedFile) return false;
		return true;
	}

	const handleSubmit = () => {
		let _formData = new FormData();

		_formData.append('title', game.title);
		_formData.append('link', game.link);
		_formData.append('image', selectedFile.file);

		postGame(_formData).then(res => {
			onCreatedGame();
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
						Create New Game
					</Typography>
				</Toolbar>
			</AppBar>

			<div className={classes.root}>
				<ClickUploader accept="image/*" onChange={handleChangeFile} preview={selectedFile ? selectedFile.preview : null} />

				<TextField
                    id="title"
                    fullWidth
                    label="Title"
                    variant="outlined"
                    value={game.title}
                    onChange={handleChangeField}
                    />

				<TextField
                    id="link"
                    fullWidth
                    label="Link"
                    variant="outlined"
                    value={game.link}
                    onChange={handleChangeField}
                    />
				
				
				<div className="flex justify-evenly px-8 pt-12 sm:px-16">
					<Button variant="contained" color="primary" type="submit" disabled={!canBeSave()} value="legacy" onClick={handleSubmit}>Save</Button>
					<Button variant="outlined" color="primary" onClick={onClose}>Cancel</Button>
				</div>
			</div>
		</Dialog>
	);
}

export default GameDlg;
