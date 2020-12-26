import React from 'react';
import {
	Grid,
	TextField,
} from '@material-ui/core';


const AboutTab = ({profile, errors, handleFieldChange}) => {

	return (
		<div className="md:flex max-w-2xl">
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<TextField
						className="mt-8 mb-16"
						error={!!errors.current_school}
						required
						label="Current School"
						autoFocus
						id="current_school"
						name="current_school"
						value={profile.current_school}
						onChange={handleFieldChange}
						variant="outlined"
						fullWidth
					/>
				</Grid>
				<Grid item sm={12} md={6}>
					<TextField
						className="mt-8 mb-16"
						error={!!errors.year}
						required
						label="Year"
						id="year"
						name="year"
						value={profile.year}
						onChange={handleFieldChange}
						variant="outlined"
						fullWidth
					/>
				</Grid>
				<Grid item sm={12} md={6}>
					<TextField
						className="mt-8 mb-16"
						error={!!errors.position}
						required
						label="Position"
						id="position"
						name="position"
						value={profile.position}
						onChange={handleFieldChange}
						variant="outlined"
						fullWidth
					/>
				</Grid>
				<Grid item sm={12} md={6}>
					<TextField
						className="mt-8 mb-16"
						error={!!errors.height}
						required
						label="Height"
						id="height"
						name="height"
						value={profile.height}
						onChange={handleFieldChange}
						variant="outlined"
						fullWidth
					/>
				</Grid>
				<Grid item sm={12} md={6}>
					<TextField
						className="mt-8 mb-16"
						error={!!errors.weight}
						required
						label="Weight"
						id="weight"
						name="weight"
						value={profile.weight}
						onChange={handleFieldChange}
						variant="outlined"
						fullWidth
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						className="mt-8 mb-16"
						error={!!errors.hs_college}
						required
						label="HS/College"
						id="hs_college"
						name="hs_college"
						value={profile.hs_college}
						onChange={handleFieldChange}
						variant="outlined"
						fullWidth
					/>
				</Grid>
				<Grid item sm={12} md={6}>
					<TextField
						className="mt-8 mb-16"
						error={!!errors.act}
						label="ACT"
						id="act"
						name="act"
						value={profile.act}
						onChange={handleFieldChange}
						variant="outlined"
						fullWidth
					/>
				</Grid>
				<Grid item sm={12} md={6}>
					<TextField
						className="mt-8 mb-16"
						error={!!errors.sat}
						label="SAT"
						id="sat"
						name="sat"
						value={profile.sat}
						onChange={handleFieldChange}
						variant="outlined"
						fullWidth
					/>
				</Grid>
			</Grid>
		</div>
	);
}

export default AboutTab;
