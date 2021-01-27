import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
	Grid,
	IconButton,
	Icon,
	Typography,
	ListSubheader,
	Select,
	FormControl,
	InputLabel,
	MenuItem
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { asset_path } from 'app/helpers/resource';
import ClickUploader from 'app/components/ClickUploader';
import { getTranscript, postTranscript, updateTranscript } from 'app/services/profileService';

const defaultData = {
	transcript: '',
	eligibility: ''
}

const useStyles = makeStyles((theme) => ({
	formControl: {
	  margin: theme.spacing(1),
	  minWidth: 120,
	  width: '100%'
	},
	selectEmpty: {
	  marginTop: theme.spacing(2),
	},
	noText: {
		color: '#cacaca',
		margin: '10px 0'
	}
}));

const TranscriptTab = ({profile}) => {
	const classes = useStyles();
	const me = useSelector(({ auth }) => auth.user);
	const [data, setData] = useState(defaultData);

	useEffect(() => {
		refreshData();
	}, []);

	const refreshData = () => {
		getTranscript(profile.user_id).then(res => {
			setData(res.data.transcript || defaultData);
		}).catch(err => {
			console.log(err);
		});
	}

	const handleChange = (e) => {
		const { value } = e.target;

		updateTranscript(profile.user_id, {'eligibility': value}).then(res => {
			refreshData();
		}).catch(err => {
			console.log(err);
		})
	}

	const handleChangeTranscript = (file) => {
		let formdata = new FormData();
		if(file){
			formdata.append('file', file);
		}

		postTranscript(profile.user_id, formdata).then(res => {
			refreshData();
		}).catch(err => {
			console.log(err);
		})
	}

	const handleDeleteTranscript = () => {
		updateTranscript(profile.user_id, {transcript: null}).then(res => {
			refreshData();
		}).catch(err => {
			console.log(err);
		})
	}

	return (
		<div className="md:flex max-w-2xl">
			<Grid container spacing={3}>
				<Grid item sm={12} md={6}>
					<ListSubheader component="div" className="flex items-center px-0">
						<Typography>Transcript</Typography>
					</ListSubheader>
					{!!data.transcript ? 
						<div >
							<a href={asset_path(data.transcript)} target="_brank">
								{data.transcript.split('/').slice(-1)}
							</a>
						</div>
						:
						<div className={classes.noText}>No Transcript</div>
					}
					

					<div className="mb-40"></div>
					
					<ListSubheader component="div" className="flex items-center px-0">
						<Typography>Eligibility</Typography>
					</ListSubheader>

					{!!data.eligibility ? 
						<div >
							<p>{data.eligibility}</p>
						</div>
						:
						<div className={classes.noText}>No Eligibility</div>
					}
				</Grid>
			</Grid>
			
		</div>
	);
}

export default TranscriptTab;
