import React, {useState} from 'react';
import { 
	Dialog,
    DialogContent,
    DialogActions,
	Icon,
    Button,
    Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: 26
    },
	iconwrap: {
        display: 'flex',
        justifyContent: 'center',
        padding: 20,
        '& span': {
            fontSize: 150
        }
    },
    text: {
        textAlign: 'center'
    }
}));

const AlertIcon = (type) => {
    if(type === 'warning') return (<Icon style={{color: 'darksalmon'}}>error_outline</Icon>);
    else if(type === 'error') return (<Icon style={{color: 'red'}}>error_outline</Icon>);
    else return (<Icon style={{color: 'darksalmon'}}>error_outline</Icon>);
}

const AlertDlg = ({open, type, text, subtext, confirmText, onClose, onConfirm}) => {
    const classes = useStyles();
    if(!open) return null;

    return (
        <Dialog
            fullWidth={true}
            maxWidth="xs"
            open={open}
            onClose={onClose}
            aria-labelledby="form-dialog-title"
            
        >
            <DialogContent>
                <div className={classes.iconwrap}>
                    <AlertIcon type={type}/>  
                </div>
                <div className={classes.text}>
                    <Typography variant="h5">{text}</Typography>
                    <Typography variant="body2">{subtext}</Typography>
                </div>
            </DialogContent>

            <DialogActions className={classes.root}>
                <Button onClick={onConfirm} variant="contained" color="primary">{confirmText || 'Yes'}</Button>
                <Button onClick={onClose} variant="outlined" color="primary">Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AlertDlg;