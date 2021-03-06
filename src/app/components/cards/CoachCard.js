import React, {useState} from 'react';
import _ from '@lodash';

import FuseAnimate from '@fuse/core/FuseAnimate/FuseAnimate';
import { 
	Card,
	CardHeader,
	CardContent,
    Avatar,
    IconButton,
    Typography,
    Popover,
    MenuItem,
    ListItemText,
    Button,
    Divider,
    FormControlLabel,
    Icon
} from '@material-ui/core';
import { RedIconBtn } from '../ColorBtns';
import { makeStyles } from '@material-ui/core/styles';
import { red, purple } from '@material-ui/core/colors';

import { asset_path } from 'app/helpers/resource';

const useStyles = makeStyles((theme) => ({
	root: {
      maxWidth: 500,
      backgroundColor: '#121212',
      color: 'white',
      borderRadius: 12,
      textAlign: 'center',
      boxShadow: '0px 3px 8px 0px #121212b8'
	},
	avatar: {
        backgroundColor: red[500],
        width: 120,
        height: 120,
        border: '3px solid white',
        fontSize: 60
    },
    desc: {
        height: '40px',
        overflow: 'hidden'
    },
    aprove: {
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: '#ffb943',
        padding: '2px 5px',
        borderRadius: '4px',
        color: '#121212',
        fontWeight: 'bold'
    },
    disable: {
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: '#808080',
        padding: '2px 5px',
        borderRadius: '4px',
        color: '#e6e6e6',
        fontWeight: 'bold'
    },
    actions: {
        position: 'absolute',
        top: -10,
        right: -10
    },
    detail: {
        textAlign: 'left',
        marginTop: 20
    },
    divider : {
        backgroundColor: '#ffffff29',
        margin: '10px 0'
    }
  }));

const CoachCard = ({user, control, onTriggeredAction, onChangeRecruit, ...props}) => {
    const classes = useStyles();

	return (
		<Card className={classes.root}>
            <CardContent>
                <div className="flex justify-center pb-20 pt-32 relative">
                    <Avatar aria-label="recipe" className={classes.avatar} src={asset_path(user.avatar)}>{user.name.slice(0, 1)}</Avatar>
                    {control && 
                        <>
                            {user.status === 'ACTIVE' ? 
                                <div className={classes.aprove}>APROVED</div>
                                :
                                <div className={classes.disable}>DISABLED</div>
                            }
                            <div className={classes.actions}>
                                <RedIconBtn onClick={() => onTriggeredAction('delete')}><Icon>delete</Icon></RedIconBtn>
                            </div>
                        </>
                    }
                </div>
                <Typography variant="h5">{user.name}</Typography>
                <Typography variant="subtitle2">{user.current_school ? `( ${user.current_school} )` : <span>&nbsp;</span>}</Typography>
                <div className="flex justify-evenly">
                    <Button variant="contained" color="secondary" className="m-12" onClick={() => onTriggeredAction('message')}>Message</Button>
                    <Button variant="outlined" color="secondary"  className="m-12" onClick={() => onTriggeredAction('detail')}>View</Button>
                </div>
                {/* <Divider className={classes.divider}/>
                <div className={classes.detail}>
                    <Typography variant="subtitle1" component="p" className="text-overflow-hidden"><strong>City:</strong>  {user.city}</Typography>
                    <Typography variant="subtitle1" component="p" className="text-overflow-hidden"><strong>State:</strong>  {user.state}</Typography>
                    <Typography variant="subtitle1" component="p"><strong>Position:</strong>  {user.position}</Typography>
                    <Typography variant="subtitle1" component="p"><strong>Height:</strong>  {user.height}&nbsp;&nbsp;<strong>Weight:</strong> {user.weight}</Typography>
                </div> */}
            </CardContent>
        </Card>
	);
}

export default CoachCard;
