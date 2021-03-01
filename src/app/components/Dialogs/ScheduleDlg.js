import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import {
    AppBar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    TextField,
    Toolbar,
    Typography
} from '@material-ui/core';
import { DateTimePicker } from '@material-ui/pickers';
import moment from 'moment';

import { isValidURL } from 'app/helpers/functions';
import { postSchedule } from 'app/services/schedule_api';

const defaultFormState = {
    title: '',
    location: '',
    date: moment(new Date(), 'MM/DD/YYYY'),
    link: '',
	desc: ''
};

const ScheduleDlg = ({event, open, user, onClose, onChanged}) => {
    const me = useSelector(({ auth }) => auth.user);
    const [isNew, setIsNew] = useState(true);
    const [schedule, setSchedule] = useState(defaultFormState);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if(event) {
            setSchedule(event);
            setIsNew(!event.id);
        }
    }, [event]);

    const handleChangeField = (e) => {
        const { id, value } = e.target;

        if(id === 'link'){
            setErrors({...errors, link: value && !isValidURL(value) ? 'invalid link' : ''})
        }
        setSchedule({...schedule, [id]: value});
    }

    const handleChangeDate = (id, value) => {
        setSchedule({...schedule,[id]: value})
    }

    const onSubmit = (type) => {
        postSchedule({
            ...schedule,
            user_id: user || 0
        }).then(res => {
            onChanged(res.data.schedule);
        }).catch(err => {
            console.log(err);
        });
    }

    const canBeSubmitted = () => {
        if(!schedule.title || !schedule.location || !!errors.link) return false;
        return true;
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
						{isNew ? 'New Schedule' : 'Edit Schedule'}
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
                />

                <TextField
                    id="location"
                    label="location"
                    className="mt-8 mb-16"
                    InputLabelProps={{
                        shrink: true
                    }}
                    name="location"
                    value={schedule.location}
                    onChange={handleChangeField}
                    variant="outlined"
                    required
                    fullWidth
                />

                <DateTimePicker
                    label="Date"
                    inputVariant="outlined"
                    value={schedule.date}
                    onChange={date => handleChangeDate('date', date)}
                    className="mt-8 mb-16 w-full"
                />

                <TextField
                    id="link"
                    label="Link"
                    className="mt-8 mb-16"
                    InputLabelProps={{
                        shrink: true
                    }}
                    name="link"
                    value={schedule.link}
                    onChange={handleChangeField}
                    variant="outlined"
                    fullWidth
                    error={!!errors.link}
                    helperText={errors.link || ''}
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
                />
            </DialogContent>

            <DialogActions className="justify-evenly px-8 sm:px-16">
                <Button variant="contained" color="primary" disabled={!canBeSubmitted()} onClick={() => onSubmit()}>
                    Save
                </Button>
                <Button variant="outlined" color="primary" onClick={onClose}>
                    Cancel
                </Button>
            </DialogActions>
		</Dialog>
	);
}

export default ScheduleDlg;
