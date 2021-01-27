import React from 'react';
import {
	Grid,
	TextField,
	MenuItem
} from '@material-ui/core';

import { states } from 'app/helpers/resource';


const InfoTab = ({profile, errors, handleFieldChange}) => {

	return (
		<div className="md:flex max-w-2xl">
			<Grid container spacing={3}>
				<Grid item sm={12} md={6}>
					<TextField
						className="mt-8 mb-16"
						error={!!errors.name}
						required
						label="Name"
						autoFocus
						id="name"
						name="name"
						value={profile.name}
						onChange={handleFieldChange}
						variant="outlined"
						fullWidth
					/>
				</Grid>
				<Grid item sm={12} md={6}>
					<TextField
						className="mt-8 mb-16"
						error={!!errors.email}
						required
						label="Email"
						id="email"
						name="email"
						value={profile.email}
						onChange={handleFieldChange}
						variant="outlined"
						fullWidth
					/>
				</Grid>
				<Grid item sm={12} md={6}>
					<TextField
						className="mt-8 mb-16"
						error={!!errors.phone}
						required
						label="Phone Number"
						id="phone"
						name="phone"
						value={profile.phone}
						onChange={handleFieldChange}
						variant="outlined"
						fullWidth
					/>
				</Grid>
				<Grid item sm={12} md={6}>
					<TextField
						className="mt-8 mb-16"
						error={!!errors.city}
						required
						label="City"
						id="city"
						name="city"
						value={profile.city}
						onChange={handleFieldChange}
						variant="outlined"
						fullWidth
					/>
				</Grid>
				<Grid item sm={12} md={6}>
					<TextField
						className="mt-8 mb-16"
						error={!!errors.state}
						required
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
				<Grid item sm={12} md={6}>
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
				<Grid item xs={12}>
					<TextField
						className="mt-8 mb-16"
						error={!!errors.twitter}
						label="Twitter"
						id="twitter"
						name="twitter"
						value={profile.twitter}
						onChange={handleFieldChange}
						variant="outlined"
						fullWidth
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
