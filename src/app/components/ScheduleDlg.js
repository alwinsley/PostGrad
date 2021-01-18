import React, { useCallback, useEffect, useState } from 'react';

import { useForm } from '@fuse/hooks';
import FuseUtils from '@fuse/utils/FuseUtils';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { DateTimePicker } from '@material-ui/pickers';
import moment from 'moment';

const defaultFormState = {
	title: '',
	allDay: true,
	start_date: moment(new Date(), 'MM/DD/YYYY'),
	end_date: moment(new Date(), 'MM/DD/YYYY'),
	desc: ''
};

const ScheduleDlg = ({event, editable, open, onClose, onChange}) => {
    const [schedule, setSchedule] = useState(defaultFormState);
    const [isNew, setIsNew] = useState(true);

    useEffect(() => {
        if(event) {
            setSchedule(event);
            setIsNew(!event.title);
        }
    }, [event]);

    const handleChangeField = (e) => {
        if(!editable) return;
        const { id, value } = e.target;

        setSchedule({...schedule, [id]: value});
    }

    const handleChangeDate = (id, value) => {
        console.log(moment(value, 'YYYY-MM-DD hh:mm:ss'));
        setSchedule({...schedule,[id]: value})
    }

    const onSubmit = (type) => {
        onChange(type, schedule);
    }

    const canBeSubmitted = () => {
        return schedule.title.length > 0;
    }

	return (
		<Dialog
			open={open}
			onClose={onClose}
			fullWidth
			maxWidth="xs"
			component="schedule"
			classes={{
				paper: 'rounded-8'
			}}
		>
			<AppBar position="static">
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						{!event ? 'New Event' : 'Edit Event'}
					</Typography>
				</Toolbar>
			</AppBar>

            <DialogContent classes={{ root: 'p-16 pb-0 sm:p-24 sm:pb-0' }}>
                <TextField
                    id="title"
                    label="Title"
                    className="mt-8 mb-16"
                    InputLabelProps={{
                        shrink: true
                    }}
                    name="title"
                    value={schedule.title}
                    onChange={handleChangeField}
                    variant="outlined"
                    autoFocus
                    required
                    fullWidth
                    InputProps={{
                        readOnly: !editable,
                    }}
                />

                <FormControlLabel
                    className="mt-8 mb-16"
                    label="All Day"
                    control={<Switch checked={schedule.allDay} id="allDay" name="allDay" onChange={handleChangeField} />}
                />

                <DateTimePicker
                    label="Start"
                    inputVariant="outlined"
                    value={schedule.start_date}
                    onChange={date => handleChangeDate('start_date', date)}
                    className="mt-8 mb-16 w-full"
                    maxDate={schedule.end_date}
                    readOnly={!editable}
                />

                <DateTimePicker
                    label="End"
                    inputVariant="outlined"
                    value={schedule.end_date}
                    onChange={date => handleChangeDate('end_date', date)}
                    className="mt-8 mb-16 w-full"
                    minDate={schedule.start_date}
                    readOnly={!editable}
                />

                <TextField
                    className="mt-8 mb-16"
                    id="desc"
                    label="Description"
                    type="text"
                    name="desc"
                    value={schedule.desc}
                    onChange={handleChangeField}
                    multiline
                    rows={5}
                    variant="outlined"
                    fullWidth
                    InputProps={{
                        readOnly: !editable,
                    }}
                />
            </DialogContent>

            {!!editable && 
                <>
                    {isNew ? (
                        <DialogActions className="justify-between px-8 sm:px-16">
                            <Button variant="contained" color="primary" disabled={!canBeSubmitted()} onClick={() => onSubmit('ADD', )}>
                                Add
                            </Button>
                        </DialogActions>
                    ) : (
                        <DialogActions className="justify-between px-8 sm:px-16">
                            <Button variant="contained" color="primary" disabled={!canBeSubmitted()} onClick={() => onSubmit('SAVE')}>
                                Save
                            </Button>
                            <IconButton onClick={() => onSubmit('DELETE')}>
                                <Icon>delete</Icon>
                            </IconButton>
                        </DialogActions>
                    )}
                </>
            }
            
		</Dialog>
	);
}

export default ScheduleDlg;
