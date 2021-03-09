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
  const [error, setError] = useState('');

  const handleChangeLink = (e) => {
    const { value } = e.target;
    setError('');
    setLink(value);
  }

  const handleChangeFile = (e) => {
    const { files } = e.target;

    if(!files.length) return;

    onChangeFile(files);
  }

  const convertValidUrl = (url) => {
    if(url.includes('hudl.com/') && !url.includes('/embed/')){
      return '';
    }

    return url.replace('http://', 'https://');
  }

  const handleSetLink = () => {
    if(!link) return;

    const url = convertValidUrl(link);

    if(url){
      onChangeLink([url]);
      setLink(null);
    }else{
      setError('Invalid URL: please refer ');
    }
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

      {error && 
        <div className="flex mt-5">
          <div style={{color: '#ff2424'}}>{error}</div>&nbsp;&nbsp;
          <a href="https://www.hudl.com/support/classic/highlights-recruiting/coaches-guide-highlights/embed-your-highlight-reel"
            target="_blank"
            style={{backgroundColor: 'transparent', color: '#2196f3', border: 0}}
            >here</a>
        </div>
      }
    </>
  );
}

export default LinkUploader;