import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
	Grid,
	IconButton,
	Icon,
	Button,
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
import { getTranscript, postAdminTranscript, updateAdminTranscript } from 'app/services/profileService';
import { eligibilities } from 'app/helpers/resource'

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
	},
	content: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between'
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

		updateAdminTranscript(profile.user_id, {'eligibility': value}).then(res => {
			refreshData();
		}).catch(err => {
			console.log(err);
		})
	}

	const handleChangeTranscript = (files) => {
		if(!files || !files.length) return;

		let formdata = new FormData();
		formdata.append('file', files[0]);

		postAdminTranscript(profile.user_id, formdata).then(res => {
			refreshData();
		}).catch(err => {
			console.log(err);
		})
	}

	const handleDeleteTranscript = () => {
		updateAdminTranscript(profile.user_id, {transcript: null}).then(res => {
			refreshData();
		}).catch(err => {
			console.log(err);
		})
	}

	const handleDeleteEligibility = () => {
		updateAdminTranscript(profile.user_id, {'eligibility': ''}).then(res => {
			refreshData();
		}).catch(err => {
			console.log(err);
		})
	}

	const handleDownload = (url, filename) => {
		fetch(url).then(res => {
			return res.blob();
		}).then(blob => {
			const href = window.URL.createObjectURL(blob);
			const link = document.createElement('a');
			link.href = href;
			link.download = filename;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		}).catch(err => console.error(err));
	}

	return (
		<div className="md:flex max-w-2xl">
			<Grid container spacing={3}>
				<Grid item sm={12} md={6}>
					<ListSubheader component="div" className="flex items-center px-0">
						<Typography>Transcript</Typography>
					</ListSubheader>
					{!!data.transcript ? 
						<div className={classes.content}>
							<a href={asset_path(data.transcript)} target="_brank">
								{data.transcript.split('/').slice(-1)}
							</a>
							<div>
								<IconButton aria-label="menu" onClick={() => handleDownload(asset_path(data.transcript), data.transcript.split('/').slice(-1))}>
									<Icon>get_app</Icon>
								</IconButton>
								{me.role === 'ADMIN' && 
									<IconButton aria-label="menu" onClick={handleDeleteTranscript}>
										<Icon>delete</Icon>
									</IconButton>
								}
							</div>
							
						</div>
						:
						<div className={classes.noText}>
							{me.role === 'ADMIN' ? <ClickUploader accept="image/*,.pdf" allows="( pdf, jpg, png, svg)" onChange={handleChangeTranscript}/> : 'No Transcript'}
						</div>
					}
					

					<div className="mb-40"></div>
					
					<ListSubheader component="div" className="flex items-center px-0">
						<Typography>Eligibility</Typography>
					</ListSubheader>

					{!!data.eligibility ? 
						<div className={classes.content}>
							<span>{data.eligibility}</span>
							{me.role === 'ADMIN' && 
								<IconButton aria-label="menu" onClick={handleDeleteEligibility}>
									<Icon>delete</Icon>
								</IconButton>
							}
						</div>
						:
						<div className={classes.noText}>
							{me.role === 'ADMIN' ? 
								<FormControl className={classes.formControl}>
									<InputLabel id="eligibility-label">Eligibility</InputLabel>
									<Select
										labelId="eligibility-label"
										id="eligibility"
										value={data.eligibility || ""}
										onChange={handleChange}
										inputProps={{ readOnly: me.role !== 'ADMIN' }}
									>
										<MenuItem>No Item</MenuItem>
										{eligibilities.map((eli, index) => 
											<MenuItem key={index} value={eli.value}>{eli.name}</MenuItem>
										)}
									</Select>
								</FormControl>
								:
								'No Eligibility'
							}
						</div>
					}
				</Grid>
			</Grid>
			
		</div>
	);
}

export default TranscriptTab;
