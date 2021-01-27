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
      maxWidth: 340,
    //   color: 'white',
      borderRadius: 12,
      boxShadow: '0px 3px 8px 0px #192d3eb8'
    },
    header: {
        // backgroundColor: '#192d3e',
        // textAlign: 'center',
        // color: 'white',
    },
    footer: {
        display: 'block',
        backgroundColor: '#192d3e',
        textAlign: 'center'
    },
    image: {
        position: 'relative',
        height: '200px',
        '& img': {
            height: '100%',
            width: '100%',
            objectFit: 'cover'
        }
    },
    link: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        padding: '12px 10px',
        display: 'flex',
        justifyContent: 'center',
        '& a': {
           borderRadius: '50px',
           padding: '6px 32px',
           opacity: 0.7
        },
        '&:hover a': {
            opacity: 1
        }
    },
    actions: {
        // position: 'absolute',
        // top: -15,
        // right: -15
    },
  }));

const GameCard = ({game, control, onTriggeredAction, ...props}) => {
    const classes = useStyles();
    
	return (
		<Card className={classes.root}>
            <CardHeader
                className={classes.header}
                title={game.title}
                action={
                    control ?
                        <div className={classes.actions}>
                            <RedIconBtn onClick={() => onTriggeredAction('delete')}><Icon>delete</Icon></RedIconBtn>
                        </div>
                    : null
                }
            />
            
            <CardContent style={{padding: 0}}>
                <div className={classes.image}>
                    <img src={asset_path(game.image)} alt={game.title}/>

                    <div className={classes.link}>
                        <Button variant="contained" color="primary" className="m-12" href={ game.link || '#'} target="blank">View</Button>
                    </div>
                </div>
            </CardContent>
        </Card>
	);
}

export default GameCard;
