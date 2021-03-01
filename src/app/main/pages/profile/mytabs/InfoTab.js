import React from 'react';
import {
	Grid,
	TextField,
	MenuItem,
	InputAdornment,
	Icon
} from '@material-ui/core';
import { QuestionAnswer } from '@material-ui/icons'

import { states } from 'app/helpers/resource';


const InfoTab = ({profile, errors, handleFieldChange}) => {

	return (
		<div className="md:flex max-w-2xl">
			<Grid container spacing={3}>
				<Grid item xs={12} md={6}>
					<TextField
						className="mt-8 mb-16"
						required
						label="Name"
						autoFocus
						id="name"
						name="name"
						value={profile.name}
						onChange={handleFieldChange}
						variant="outlined"
						fullWidth
						error={!!errors.name}
						helperText={errors.name}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						className="mt-8 mb-16"
						required
						label="Email"
						id="email"
						name="email"
						value={profile.email}
						onChange={handleFieldChange}
						variant="outlined"
						fullWidth
						error={!!errors.email}
						helperText={errors.email}
					/>
				</Grid>
				{profile && profile.role === 'COACH' && 
					<Grid item xs={12}>
						<TextField
							className="mt-8 mb-16"
							required
							label="Current School"
							id="current_school"
							name="current_school"
							value={profile.current_school}
							onChange={handleFieldChange}
							variant="outlined"
							fullWidth
							error={!!errors.current_school}
							helperText={errors.current_school}
						/>
					</Grid>
				}
				{profile && profile.role === 'PLAYER' && 
					<Grid item xs={12} md={6}>
						<TextField
							className="mt-8 mb-16"
							error={!!errors.ncaa}
							label="NCAA ID"
							id="ncaa"
							name="ncaa"
							variant="outlined"
							fullWidth
							value={profile.ncaa}
							onChange={handleFieldChange}
							InputProps={{
								endAdornment: (
									<InputAdornment position="start">
										<a href="https://web3.ncaa.org/ecwr3/" target="_blank" role="button">
											<Icon >help_outline</Icon>
										</a>
									</InputAdornment>
								)
							}}
						/>
					</Grid>
				}
				<Grid item xs={12} md={6}>
					<TextField
						className="mt-8 mb-16"
						error={!!errors.city}
						label="City"
						id="city"
						name="city"
						value={profile.city}
						onChange={handleFieldChange}
						variant="outlined"
						fullWidth
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						className="mt-8 mb-16"
						error={!!errors.state}
						label="State"
						id="state"
						name="state"
						select
						value={profile.state || ''}
						onChange={handleFieldChange}
						variant="outlined"
						fullWidth
					>
						<MenuItem key='empty' value=''>
							select...
						</MenuItem>
						{states.map((s) => (
							<MenuItem key={s.value} value={s.label}>
								{s.label}
							</MenuItem>
						))}
					</TextField>
				</Grid>
				{profile && profile.role === 'PLAYER' && 
					<Grid item xs={12} md={6}>
						<TextField
							className="mt-8 mb-16"
							error={!!errors.zip}
							required
							label="Zip"
							id="zipcode"
							name="zipcode"
							value={profile.zipcode}
							onChange={handleFieldChange}
							variant="outlined"
							fullWidth
						/>
					</Grid>
				}
				<Grid item xs={12}>
					<TextField
						className="mt-8 mb-16"
						error={!!errors.twitter}
						label="Twitter"
						id="twitter"
						name="twitter"
						value={profile.twitter && profile.twitter.slice(0, 20) === 'https://twitter.com/' ? profile.twitter.slice(20) : profile.twitter}
						onChange={handleFieldChange}
						variant="outlined"
						fullWidth
						InputProps={{
							startAdornment: (<InputAdornment position="start">https://twitter.com/</InputAdornment>),
							endAdornment: (
								<InputAdornment position="start">
									<a href="https://twitter.com/" target="_blank" role="button">
										<Icon >help_outline</Icon>
									</a>
								</InputAdornment>
							)
						}}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						className="mt-8 mb-16"
						error={!!errors.description}
						label="Description"
						multiline
          				rows={4}
						id="description"
						name="description"
						value={profile.description}
						onChange={handleFieldChange}
						variant="outlined"
						fullWidth
					/>
				</Grid>
			</Grid>
		</div>
	);
}

export default InfoTab;
