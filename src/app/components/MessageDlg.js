import React, {useState} from 'react';
import { useDispatch } from 'react-redux';

import { 
	Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
	TextField,
    Button,
    Typography,
    Collapse,
    CardContent,
    IconButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { postMessage } from 'app/services/messageService';
import { showMessage } from 'app/store/fuse/messageSlice';

const useStyles = makeStyles((theme) => ({
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    header: {
        backgroundColor: '#121212',
        color: 'white'
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    collapse: {
        display: 'flex',
        justifyContent: 'between',
        alignItems: 'center',
        margin: '10px'
    }
}));

const MessageDlg = ({open, title, to, mail, onClose}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [message, setMessage] = useState('');
    const [expanded, setExpanded] = useState(false);

    const handleChange = (e) => {
        const {value} = e.target;
        setMessage(value);
    }

    const sendMessage = () => {
		postMessage({receivers: [to.id], message}).then(res => {
			dispatch(showMessage({variant: 'success', message: 'message sent successfully' }));
		}).catch(err => {
			dispatch(showMessage({variant: 'error', message: 'message failed' }));
        });
        
        onClose();
	}

    return (
        <Dialog
            fullWidth={true}
            maxWidth="sm"
            open={open}
            onClose={onClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle className={classes.header} id="form-dialog-title">{ title ? title : 'Message'}</DialogTitle>
            <DialogContent>
                <div className={classes.collapse}>
                    <Typography variant="h6">To: {to.name}</Typography>
                    
                    {!!mail && !!mail.message && 
                        <IconButton
                            className={clsx(classes.expand, {
                                [classes.expandOpen]: expanded,
                            })}
                            onClick={() => setExpanded(!expanded)}
                            aria-expanded={expanded}
                            aria-label="show more"
                            >
                            <ExpandMoreIcon />
                        </IconButton>
                    }
                </div>
                
                {!!mail && !!mail.message && 
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography paragraph color="textSecondary">{mail.message}</Typography>
                        </CardContent>
                    </Collapse>
                }

                <TextField
                    id="message"
                    fullWidth
                    label="Message"
                    multiline
                    rows={5}
                    placeholder="message ..."
                    variant="outlined"
                    value={message}
                    onChange={handleChange}
                    />
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={sendMessage} color="primary">Send</Button>
                <Button variant="outlined" onClick={onClose} color="primary">Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}

export default MessageDlg;