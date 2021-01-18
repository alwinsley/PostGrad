import React, {useState} from 'react';
import _ from '@lodash';

import { 
	Card,
    CardHeader,
    CardContent,
    CardActions,
    List,
    ListItem,
    Typography,
    ListItemText,
    Button,
    Divider,
} from '@material-ui/core';
import { RedIconBtn } from '../ColorBtns';
import { makeStyles } from '@material-ui/core/styles';
import { red, purple } from '@material-ui/core/colors';

import { asset_path } from 'app/helpers/resource';

const useStyles = makeStyles((theme) => ({
	root: {
        position: 'relative',
        maxWidth: 340,
        paddingBottom: 46,
        height: '100%',
        borderRadius: 12,
        boxShadow: '0px 3px 8px 0px #192d3eb8'
    },
    header: {
        backgroundColor: '#192d3e',
        textAlign: 'center',
        color: 'white',
    },
    footer: {
        position: 'absolute',
        bottom: 15,
        left: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
    },
  }));

const MemberCard = ({member, permissions, onTriggeredAction, ...props}) => {
    const classes = useStyles();
    let memberAcesses = [];
    
    if(member && member.permissions){
        let _permissions = member.permissions.split(',');
        memberAcesses = permissions.filter(p => _permissions.indexOf(p.id.toString()) > -1);
    }

	return (
		<Card className={classes.root}>
            <CardHeader className={classes.header} title={member ? member.title : 'No Member'}/>

            <CardContent>
                <List component="nav" aria-label="main mailbox folders">
                    <ListItem button>
                        <ListItemText primary="Message & Profile access" />
                    </ListItem>
                    <Divider/>

                    {memberAcesses.map(access => 
                        <>
                            <ListItem button>
                                <ListItemText primary={access.name} />
                            </ListItem>
                            <Divider/>
                        </>
                    )}
                </List>

                {member && 
                    <div className={classes.footer}>
                        <Button variant="contained" color="secondary">Get Access</Button>
                    </div>
                }
            </CardContent>
        </Card>
	);
}

export default MemberCard;
