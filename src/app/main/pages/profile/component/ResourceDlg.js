import React, {useState, useEffect} from 'react';
import { 
	Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
	TextField,
    Button,
    Checkbox,
    FormControlLabel
} from '@material-ui/core';

const ResourceDlg = ({resource, open, onClose, onSave}) => {
    const [attribute, setAttribute] = useState({});

    useEffect(() => {
        setAttribute({
            id: resource.id || null,
            index: resource.index,
            description: resource.description || '',
            highlight: resource.highlight || 0,
            workout: resource.workout || 0
        });
    }, []);

    const handleChange = (e) => {
        const {id, value} = e.target;
        setAttribute({...attribute, [id]: value});
    }

    const handleCheck = (e) => {
        const {id, checked} = e.target;
        setAttribute({...attribute, [id]: checked ? 1 : 0});
    }

    const handleSave = () => {
        onSave(attribute);
    }

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title" fullWidth maxWidth="sm">
            <DialogTitle id="form-dialog-title" style={{backgroundColor: '#121212', color: 'white'}}>Edit Attribute</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="description"
                    label="Description"
                    value={attribute.description}
                    onChange={handleChange}
                    fullWidth
                />
                <br/>
                <FormControlLabel label="Highlight"
                    control={
                        <Checkbox
                            id="highlight"
                            checked={attribute.highlight}
                            onChange={handleCheck}
                            name="highlight"
                            color="primary"
                        />
                    }
                />
                <FormControlLabel label="Workout"
                    control={
                        <Checkbox
                            id="workout"
                            checked={attribute.workout}
                            onChange={handleCheck}
                            name="workout"
                            color="primary"
                        />
                    }
                />
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={handleSave} color="primary">Save</Button>
                <Button variant="outlined" onClick={onClose} color="primary">Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ResourceDlg;