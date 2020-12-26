import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';

import FuseChipSelect from '@fuse/core/FuseChipSelect';
import { 
	Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
	TextField,
    Button,
} from '@material-ui/core';

import { showMessage } from 'app/store/fuse/messageSlice';
import { postMessage } from '../../../services/messageService';

const MultiMessageDlg = ({receivers, open, onClose}) => {
    const dispatch = useDispatch();
    const [message, setMessage] = useState('');
    const [selected, setSelected] = useState([]);

    useEffect(() => {
        setSelected(receivers);
    }, [receivers]);

    const handleChangeReceivers = (value) => {
        setSelected(value);
    }

    const handleChange = (e) => {
        const {value} = e.target;
        setMessage(value);
    }

    const handleSendMessage = () => {
        if(!selected.length || !message) {
            alert("can't send message");
            return;
        }

        let _selected = selected.map(sel => {
            return sel.value
        });

        postMessage({receivers: _selected, message: message}).then(res => {
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
        <Dialog
            fullWidth={true}
            maxWidth="md"
            open={open}
            onClose={onClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">Send Message</DialogTitle>
            <DialogContent>
                <FuseChipSelect
                    className="w-full my-16 mb-12"
                    value={selected}
                    onChange={handleChangeReceivers}
                    placeholder="Select..."
                    textFieldProps={{
                        label: 'To: ',
                        InputLabelProps: {
                            shrink: true
                        },
                        variant: 'standard'
                    }}
                    options={receivers}
                    isMulti
                />
                
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
                <Button onClick={handleSendMessage} color="primary">Send</Button>
                <Button onClick={onClose} color="primary">Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}

export default MultiMessageDlg;