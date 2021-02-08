import React, { useEffect, useState } from 'react';

import {
    AppBar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Icon,
    IconButton,
    TextField,
    Toolbar,
    Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { PostArticle } from 'app/services/article_api';

const useStyles = makeStyles((theme) => ({
    fieldWrapper: {
        display: 'flex',
        alignItems: 'center',
        'label': {
            color: 'rgba(0, 0, 0, 0.54)',
            cursor: 'pointer'
        }
    }
}));

const defaultFormState = {
    title: '',
    content: '',
    image: null,
    link: null
};

const NewsDlg = ({event, editable, open, user, onClose, onChanged}) => {
    const classes = useStyles();
    const [article, setArticle] = useState(defaultFormState);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isNew, setIsNew] = useState(true);

    useEffect(() => {
        if(event) {
            setArticle(event);
            setIsNew(!event.title);
        }
    }, [event]);

    const handleChangeField = (e) => {
        if(!editable) return;
        const { id, value } = e.target;

        setArticle({...article, [id]: value});
    }

    const handleChangeFile = (e) => {
        const { files } = e.target;

        if(!files.length) return;

        setSelectedFile({
            file: files[0],
            filename: files[0].name
        });
    }

    const onSubmit = () => {
        let formdata = new FormData();

        formdata.append('title', article.title);
        formdata.append('content', article.content);
        if(article.link) formdata.append('link', article.link);
        if(selectedFile) formdata.append('image', selectedFile.file);

        PostArticle(formdata).then(res => {
            onChanged(res.data.article);
        }).catch(err => {
            console.log(err);
        });
    }

    const canBeSubmitted = () => {
        return article.title && article.content;
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
						{!event ? 'News' : 'Edit News'}
					</Typography>
				</Toolbar>
			</AppBar>

            <DialogContent classes={{ root: 'p-16 pb-0 sm:p-24 sm:pb-0' }}>
                <TextField
                    id="title"
                    label="Title"
                    className="mt-8 mb-16"
                    InputLabelProps={{
                        shrink: true
                    }}
                    name="title"
                    value={article.title}
                    onChange={handleChangeField}
                    variant="outlined"
                    autoFocus
                    required
                    fullWidth
                    InputProps={{
                        readOnly: !editable,
                    }}
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
                    rows={5}
                    variant="outlined"
                    fullWidth
                    InputProps={{
                        readOnly: !editable,
                    }}
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
                    InputProps={{
                        readOnly: !editable,
                    }}
                />

                <div className={classes.fieldWrapper}>
                    <Typography>Image</Typography>&nbsp;&nbsp;
                    <label htmlFor="image_input">
                        <input type="file" id="image_input" accept="image/*" hidden onChange={handleChangeFile}/>
                        <Icon>add_photo_alternate</Icon>
                    </label>
                </div>
                {selectedFile && <p>{selectedFile.filename}</p> }
                <br/>
            </DialogContent>

            {!!editable && 
                <>
                    {isNew ? (
                        <DialogActions className="justify-between px-8 sm:px-16">
                            <Button variant="contained" color="primary" disabled={!canBeSubmitted()} onClick={() => onSubmit('ADD', )}>
                                Add
                            </Button>
                        </DialogActions>
                    ) : (
                        <DialogActions className="justify-between px-8 sm:px-16">
                            <Button variant="contained" color="primary" disabled={!canBeSubmitted()} onClick={() => onSubmit('SAVE')}>
                                Save
                            </Button>
                            <IconButton onClick={() => onSubmit('DELETE')}>
                                <Icon>delete</Icon>
                            </IconButton>
                        </DialogActions>
                    )}
                </>
            }
            
		</Dialog>
	);
}

export default NewsDlg;
