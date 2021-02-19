import React, {useState} from 'react'
import { 
	TextField,
	MenuItem,
    Button
} from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';

import { DatePicker } from "@material-ui/pickers";
import { positions, states, eligibilities } from 'app/helpers/resource';

const Filters = ({filters, onChange, onClearAll}) => {
    const [showFilter, setShowFilter] = useState(false);

    return (
        <div>
            <Button
                className="w-full sm:hidden"
                variant="contained"
                color="secondary"
                startIcon={<FilterListIcon />}
                onClick={() => setShowFilter(!showFilter)}
            >
                Filter
            </Button>
            <div className={`${showFilter ? 'flex' : 'hidden'} bg-gray-300 p-10 items-end flex-col sm:flex sm:flex-row`}>
                <TextField
                    id="position"
                    name="position"
                    select
                    label="Position"
                    value={filters.position || ''}
                    className="w-full flex-grow my-5 sm:mr-5 sm:my-0"
                    onChange={onChange}
                >
                    {positions.map(p => (
                        <MenuItem key={p.value} value={p.value}>
                            {p.value}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="eligibility"
                    name="eligibility"
                    select
                    label="Eligibility"
                    value={filters.eligibility || ''}
                    className="w-full flex-grow my-5 sm:mr-5 sm:my-0"
                    onChange={onChange}
                >
                    {eligibilities.map(el => (
                        <MenuItem key={el.value} value={el.value}>
                            {el.name}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="state"
                    name="state"
                    select
                    label="State"
                    value={filters.state || ''}
                    className="w-full flex-grow my-5 sm:mr-5 sm:my-0"
                    onChange={onChange}
                >
                    {states.map(s => (
                        <MenuItem key={s.value} value={s.label}>
                            {s.label}
                        </MenuItem>
                    ))}
                </TextField>
                <DatePicker
                    className="w-full flex-grow my-5 sm:mr-5 sm:my-0"
                    autoOk
                    variant="inline"
                    views={["year"]}
                    label="Year"
                    value={filters.year || null}
                    onChange={date => onChange({target: {name: 'year', value: date}})}
                />
                <div className="w-full flex-grow text-center my-5 sm:text-right sm:my-0">
                    <Button variant="contained" color="primary" className="sm:hidden inline-flex" onClick={() => setShowFilter(false)}>
                        Apply
                    </Button>&nbsp;&nbsp;&nbsp;
                    <Button variant="contained" color="primary"  onClick={onClearAll}>
                        Clear
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Filters;