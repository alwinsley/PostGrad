import React, {useState} from 'react';
import _ from '@lodash';

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
    Switch, Icon
} from '@material-ui/core';
import { RedIconBtn } from '../ColorBtns';
import { makeStyles } from '@material-ui/core/styles';
import { red, purple } from '@material-ui/core/colors';

import { asset_path } from 'app/helpers/resource';

const useStyles = makeStyles((theme) => ({
	root: {
      maxWidth: 340,
      backgroundColor: '#192d3e',
      color: 'white',
      borderRadius: 12,
      textAlign: 'center',
      boxShadow: '0px 3px 8px 0px #192d3eb8'
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
    topten: {
        position: 'absolute',
        top: -10,
        left: 0,
        color: 'gray'
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
    },
    topicon: {
        color: '#ffc800',
        fontSize: 40
    }
  }));

const PlayerCard = ({user, control, onTriggeredAction, onChangeRecruit, ...props}) => {
    const classes = useStyles();
    
	return (
		<Card className={classes.root}>
            <CardContent>
                <div className="flex justify-center py-20 relative">
                    <Avatar aria-label="recipe" className={classes.avatar} src={asset_path(user.avatar)}>{user.name.slice(0, 1)}</Avatar>
                    <div className={classes.topten}>
                        {control && 
                            <FormControlLabel
                                value="end"
                                control={<Switch color="secondary" checked={user.is_top === 1} onChange={() => onTriggeredAction('recruit')}/>}
                                label="RECRUIT"
                                labelPlacement="end"
                            />
                        }
                        {!control && user.is_top === 1 && <Icon className={classes.topicon}>how_to_reg</Icon>}
                    </div>

                    {control && 
                        <div className={classes.actions}>
                            <RedIconBtn onClick={() => onTriggeredAction('delete')}><Icon>delete</Icon></RedIconBtn>
                        </div>
                    }
                </div>
                <Typography variant="h5">{user.name}</Typography>
                <Typography variant="overline">( {user.role} )</Typography>
                <div className="flex justify-evenly">
                    <Button variant="contained" color="secondary" onClick={() => onTriggeredAction('message')}>Message</Button>
                    <Button variant="outlined" color="secondary"  onClick={() => onTriggeredAction('detail')}>View</Button>
                </div>
                <Divider className={classes.divider}/>
                <div className={classes.detail}>
                    <Typography variant="subtitle1" component="p" className="text-overflow-hidden"><strong>City:</strong>  {user.city}</Typography>
                    <Typography variant="subtitle1" component="p" className="text-overflow-hidden"><strong>State:</strong>  {user.state}</Typography>
                    <Typography variant="subtitle1" component="p" className="text-overflow-hidden"><strong>Position:</strong>  {user.position}</Typography>
                    <Typography variant="subtitle1" component="p" className="text-overflow-hidden"><strong>Height:</strong>  {user.height}&nbsp;&nbsp;<strong>Weight:</strong> {user.weight}</Typography>
                </div>
            </CardContent>
        </Card>
	);
}

export default PlayerCard;
