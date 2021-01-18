import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  InputBase,
  Divider,
  IconButton,
  Icon
} from '@material-ui/core';

import { isValidURL } from 'app/helpers/functions';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
    '& label': {
      height: '24px',
      cursor: 'pointer'
    }
  },
  divider: {
    height: 28,
    margin: 4,
  },
  preview: {
    width: '100%'
  }
}));

 const LinkUploader = ({accept, multiple, onChangeFile, onChangeLink, preview}) => {
  const classes = useStyles();
  const [link, setLink] = useState(null);

  const handleChangeLink = (e) => {
    const { value } = e.target;

    setLink(value);
  }

  const handleChangeFile = (e) => {
    const { files } = e.target;

    if(!files.length) return;

    onChangeFile(files);
  }

  const handleSetLink = () => {
    if(!link) return;

    onChangeLink([link]);
    setLink(null);
  }

  return (
    <>
      {preview && 
        <div>
          <img className={classes.preview} src={preview}/>
        </div>
      }
      
      <Paper component="form" className={classes.root}>
        <IconButton className={classes.iconButton} aria-label="menu">
          <label htmlFor="logo">
            <input accept={accept || '*'} multiple={!!multiple} type="file" id="logo" hidden onChange={handleChangeFile}/>
              <Icon color="primary">cloud_upload</Icon>
          </label>
        </IconButton>
        
        
        <InputBase
          className={classes.input}
          placeholder="Enter a link"
          inputProps={{ 'aria-label': 'enter a link' }}
          onChange={handleChangeLink}
        />
        <Divider className={classes.divider} orientation="vertical" />
        <IconButton color="primary" className={classes.iconButton} disabled={!link || !isValidURL(link) } onClick={handleSetLink} aria-label="directions">
          <Icon>library_add_check</Icon>
        </IconButton>
      </Paper>
    </>
  );
}

export default LinkUploader;