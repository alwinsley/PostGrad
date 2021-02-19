import React, { useEffect, useState } from 'react';
import {
	AppBar,
	Button,
	Dialog,
	DialogContent,
	Typography,
	Toolbar,
	TextField
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ClickUploader from 'app/components/ClickUploader';
import { isValidURL } from 'app/helpers/functions';
import { postGame } from 'app/services/game_api';

const defaultGame = {
	title: '',
	image: '',
	link: ''
}

const GameDlg = ({open, data, onClose, onSuccess, ...props}) => {
	const [isNew, setIsNew] = useState(true);
	const [game, setGame] = useState(defaultGame);
	const [selectedFile, setSelectedFile] = useState(null);
	const [errors, setErrors] = useState({});

	useEffect(() => {
		if(data) {
            setGame(data);
            setIsNew(!data.id);
        }
	}, []);

	const handleChangeField = (e) => {
		const {id, value} = e.target;
		if(id === 'link'){
			setErrors({...errors, link: !value || isValidURL(value) ? '' : 'invalid url' });
		}
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
		if(!game.title || !game.link || !!errors.link) return false;
		if(isNew && !selectedFile) return false;
		return true;
	}

	const handleSubmit = () => {
		let _formData = new FormData();

		if(!isNew && game.id) _formData.append('id', game.id);
		_formData.append('title', game.title);
		_formData.append('link', game.link);
		if(selectedFile) _formData.append('image', selectedFile.file);

		postGame(_formData).then(res => {
			onSuccess();
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
						{isNew ? 'Add New Game' : 'Edit Game'}
					</Typography>
				</Toolbar>
			</AppBar>

			<DialogContent classes={{ root: 'p-16 pb-0 sm:p-24 sm:pb-0' }}>
				<ClickUploader
					accept="image/*"
					text="Select Image"
					allows="( jpg, png, svg, gif )"
					onChange={handleChangeFile}
					preview={selectedFile ? selectedFile.preview : null} />

				<TextField
					id="title"
					required
                    fullWidth
                    label="Title"
                    variant="outlined"
                    value={game.title}
					onChange={handleChangeField}
					className="mt-20 mb-16"
                    />

				<TextField
					id="link"
					required
                    fullWidth
                    label="Link"
                    variant="outlined"
                    value={game.link}
					onChange={handleChangeField}
					className="mt-8 mb-16"
                />
				
				<div className="flex justify-evenly px-8 py-16 sm:px-16">
					<Button variant="contained" color="primary" type="submit" disabled={!canBeSave()} value="legacy" onClick={handleSubmit}>Save</Button>
					<Button variant="outlined" color="primary" onClick={onClose}>Cancel</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default GameDlg;
