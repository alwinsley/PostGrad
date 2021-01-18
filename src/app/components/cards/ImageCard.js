import React, {useState} from 'react';
import _ from '@lodash';

import { 
	Card,
    CardHeader,
    CardMedia,
    CardContent,
    CardActions,
    Avatar,
    IconButton,
    Typography,
    Popover,
    MenuItem,
    ListItemText,
    Button,
    Divider,
    FormControlLabel,
    Switch,
    Icon
} from '@material-ui/core';
import { RedIconBtn } from '../ColorBtns';
import { makeStyles } from '@material-ui/core/styles';
import { red, purple } from '@material-ui/core/colors';

import { asset_path } from 'app/helpers/resource';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        height: 0,
        paddingBottom: '60%'
    },
    image: {
        width: '100%',
        height: '100%',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    },
    actions: {
        position: 'absolute',
        top: 0,
        right: 0
    },
  }));

const ImageCard = ({data, control, onTriggeredAction, ...props}) => {
    const classes = useStyles();
    
	return (
        <div className={classes.root}>
            <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}>
                <div className={classes.image} style={{backgroundImage: `url(${asset_path(data.image)})`}}></div>
            </div>
            
            {control && 
                <div className={classes.actions}>
                    <RedIconBtn onClick={() => onTriggeredAction('delete')}><Icon>delete</Icon></RedIconBtn>
                </div>
            }
        </div>
	);
}

export default ImageCard;
