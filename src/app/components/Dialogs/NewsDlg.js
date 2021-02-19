import React, { useEffect, useState } from 'react';

import {
    AppBar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    TextField,
    Toolbar,
    Typography
} from '@material-ui/core';

import ClickUploader from '../ClickUploader';
import { isValidURL } from 'app/helpers/functions';
import { PostArticle } from 'app/services/article_api';

const defaultFormState = {
    title: '',
    content: '',
    link: '',
    image: null
};

const NewsDlg = ({open, data, onClose, onChanged}) => {
    const [article, setArticle] = useState(defaultFormState);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isNew, setIsNew] = useState(true);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if(data) {
            setArticle(data);
            setIsNew(!data.id);
        }
    }, [data]);

    const handleChangeField = (e) => {
        const { id, value } = e.target;
        if(id === 'link'){
			setErrors({...errors, link: !value || isValidURL(value) ? '' : 'invalid url' });
		}
        setArticle({...article, [id]: value});
    }

    const handleChangeFile = (files) => {
        setSelectedFile({
			file: files[0],
			preview: URL.createObjectURL(files[0])
		});
    }

    const onSubmit = () => {
        let formdata = new FormData();

        if(!isNew && article.id) formdata.append('id', article.id);
        formdata.append('title', article.title);
        formdata.append('content', article.content);
        formdata.append('link', article.link);
        if(selectedFile) formdata.append('image', selectedFile.file);

        PostArticle(formdata).then(res => {
            onChanged(res.data.article);
        }).catch(err => {
            console.log(err);
        });
    }

    const canBeSubmitted = () => {
        if(!article.title || !article.content || errors.link) return false;
		return true;
    }

	return (
		<Dialog
			open={open}
			onClose={onClose}
			fullWidth
			maxWidth="xs"
			component="article"
			classes={{
				paper: 'rounded-8'
			}}
		>
			<AppBar position="static">
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						{isNew ? 'Add News' : 'Edit News'}
					</Typography>
				</Toolbar>
			</AppBar>

            <DialogContent classes={{ root: 'p-16 pb-0 sm:p-24 sm:pb-0' }}>
                <ClickUploader
					preview={selectedFile ? selectedFile.preview : null}
					accept="image/*"
					text="Select Image"
					allows="( jpg, png, svg, gif )"
					onChange={handleChangeFile}
				/>
                <TextField
                    id="title"
                    label="Title"
                    className="mt-20 mb-16"
                    name="title"
                    value={article.title}
                    onChange={handleChangeField}
                    variant="outlined"
                    autoFocus
                    required
                    fullWidth
                />

                <TextField
                    className="mt-8 mb-16"
                    id="content"
                    label="Content"
                    type="text"
                    name="content"
                    value={article.content}
                    onChange={handleChangeField}
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                    required
                />

                <TextField
                    className="mt-8 mb-16"
                    id="link"
                    label="Link"
                    type="text"
                    name="link"
                    value={article.link}
                    onChange={handleChangeField}
                    variant="outlined"
                    fullWidth
                    error={!!errors.link}
                    helperText={errors.link || ''}
                />
            </DialogContent>

            <DialogActions className="justify-evenly px-8 py-16 sm:px-16">
                <Button variant="contained" color="primary" disabled={!canBeSubmitted()} onClick={() => onSubmit()}>
                    Save
                </Button>
                <Button variant="outlined" color="primary" onClick={onClose}>
                    Cancel
                </Button>
            </DialogActions>
            
		</Dialog>
	);
}

export default NewsDlg;
