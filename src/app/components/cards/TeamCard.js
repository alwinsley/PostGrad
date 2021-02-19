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
      color: 'white',
      borderRadius: 12,
      boxShadow: '0px 3px 8px 0px #121212b8'
    },
    footer: {
        display: 'block',
        backgroundColor: '#121212',
        textAlign: 'center'
    },
	logo: {
        height: '120px',
        width: 'auto'
    },
    avatar: {
        height: '100%'
    },

    actions: {
        position: 'absolute',
        top: -15,
        right: -15
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

const TeamCard = ({team, control, onTriggeredAction, ...props}) => {
    const classes = useStyles();
    
	return (
		<Card className={classes.root}>
            <CardContent>
                <div className="flex justify-center py-20 relative">
                    <img className={classes.logo} src={asset_path(team.team_logo)} alt={team.team_name}/>

                    {control && 
                        <div className={classes.actions}>
                            <RedIconBtn onClick={() => onTriggeredAction('delete')}><Icon>delete</Icon></RedIconBtn>
                        </div>
                    }
                </div>
                
            </CardContent>
            <CardActions className={classes.footer}>
                <Typography variant="h6">{team.team_name}</Typography>
            </CardActions>
        </Card>
	);
}

export default TeamCard;
