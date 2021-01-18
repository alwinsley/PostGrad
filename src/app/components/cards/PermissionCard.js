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
    ListItemIcon,
    Checkbox
} from '@material-ui/core';
import { RedIconBtn } from '../ColorBtns';
import { makeStyles } from '@material-ui/core/styles';
import { red, purple } from '@material-ui/core/colors';

import { dateString } from 'app/helpers/functions';

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
        color: 'white',
        '& .MuiCardHeader-title': {
            fontSize: '1.6rem',
        }
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

const PermissionCard = ({userpermission, permission, onTriggeredAction, ...props}) => {
    const classes = useStyles();
    const [selected, setSelected] = useState(null);

    const handleCheck = (type) => {
        if(userpermission) return;

        if(type === selected) setSelected(null);
        else setSelected(type);
    }

    const handleGetAccess = () => {
        if(!selected) return;

        onTriggeredAction('GET', {permission_id: permission.id, month: selected === 'six_month_price' ? 6 : 1});
    }

	return (
		<Card className={classes.root}>
            <CardHeader className={classes.header} title={permission.name}/>

            <CardContent>
                <List component="nav" aria-label="main mailbox folders">
                    <ListItem button onClick={() => handleCheck('month_price')}>
                        <ListItemIcon>
                            <Checkbox
                                edge="start"
                                checked={selected === 'month_price'}
                                tabIndex={-1}
                                disableRipple
                                disabled={!!userpermission}
                                inputProps={{ 'aria-labelledby': 'month_price' }}
                            />
                        </ListItemIcon>
                        <ListItemText primary={`${permission.month_price}$ / Month`} />
                    </ListItem>
                    <Divider/>

                    <ListItem button onClick={() => handleCheck('six_month_price')}>
                        <ListItemIcon>
                            <Checkbox
                                edge="start"
                                checked={selected === 'six_month_price'}
                                tabIndex={-1}
                                disableRipple
                                disabled={!!userpermission}
                                inputProps={{ 'aria-labelledby': 'six_month_price' }}
                            />
                        </ListItemIcon>
                        <ListItemText primary={`${permission.six_month_price}$ / 6 Monthes`} />
                    </ListItem>
                    <Divider/>

                    {/* <ListItem button onClick={() => handleCheck('kid_price')}>
                        <ListItemIcon>
                            <Checkbox
                                edge="start"
                                checked={selected === 'kid_price'}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': 'kid_price' }}
                            />
                        </ListItemIcon>
                        <ListItemText primary={`${permission.kid_price}$ / Kid`} />
                    </ListItem>
                    <Divider/> */}
                </List>

                <div className={classes.footer}>
                    {userpermission ? 
                        <div><span style={{fontWeight: 'bold'}}>Expire At :</span> {dateString(userpermission.expired_at)}</div>
                        :
                        <Button variant="contained" color="secondary" disabled={!selected} onClick={handleGetAccess}>Get Access</Button>
                    }
                </div>
            </CardContent>
        </Card>
	);
}

export default PermissionCard;
