import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  InputBase,
  Divider,
  IconButton,
  Icon,
  Typography
} from '@material-ui/core';

import { isValidURL } from 'app/helpers/functions';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'inline-flex',
    marginTop: '10px',
    cursor: 'pointer',
    width: '100%'
  },
  card: {
    padding: '2px 16px 2px 4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  iconButton: {
    padding: 10,
    marginRight: 10,
    '& label': {
      height: '24px',
      cursor: 'pointer'
    }
  },
  preview: {
    width: '100%'
  }
}));

 const ClickUploader = ({accept, multiple, text, allows,  onChange, preview}) => {
  const classes = useStyles();
  
  const handleChangeFile = (e) => {
    const { files } = e.target;

    if(!files.length) return;

    onChange(files);
  }

  return (
    <>
      {preview && 
        <div>
          <img className={classes.preview} src={preview}/>
        </div>
      }
      
      <label htmlFor="uploader" className={classes.root}>
        <input type="file" accept={accept || '*'} multiple={!!multiple} id="uploader" hidden onChange={handleChangeFile}/>
        <Paper component="form" className={classes.card}>
          <IconButton className={classes.iconButton} aria-label="menu">
            <Icon color="primary">cloud_upload</Icon>
          </IconButton>
          <Typography className="font-bold">{text || 'Click and Upload'}<span className="font-normal">{allows || ''}</span></Typography>    
        </Paper>
      </label>
        
    </>
  );
}

export default ClickUploader;