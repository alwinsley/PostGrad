import React, {useState} from 'react';
import { useDispatch } from 'react-redux';

import { 
	Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
	TextField,
    Button,
    Typography
} from '@material-ui/core';

import { showMessage } from 'app/store/fuse/messageSlice';
import { postMessage } from '../../../../services/messageService';

const MessageDlg = ({to, open, onClose}) => {
    const dispatch = useDispatch();
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const {value} = e.target;
        setMessage(value);
    }

    const handleSend = () => {
        if(!message) {
            alert("can't send message");
            return;
        }

        postMessage({receivers: [to.id], message: message}).then(res => {
            dispatch(showMessage({
                message: 'message sent successfully',
                autoHideDuration: 2000,//ms
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                },
                variant: 'success'
            }));
            onClose();
        }).catch(err => {
            console.log(err);
        });
    }

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title" fullWidth maxWidth="md">
            <DialogTitle id="form-dialog-title">Send Message</DialogTitle>
            <DialogContent>
                <Typography className="mb-12">To: {to.name}</Typography>
                <TextField
                    autoFocus
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
                <Button onClick={handleSend} color="primary">Send</Button>
                <Button onClick={onClose} color="primary">Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}

export default MessageDlg;