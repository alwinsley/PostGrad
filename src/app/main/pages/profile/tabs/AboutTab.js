import React, { useEffect, useState } from 'react';
import {
	Grid,
	TextField,
} from '@material-ui/core';


const AboutTab = ({profile}) => {

	return (
		<div className="md:flex max-w-2xl">
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<TextField
						className="mt-8 mb-16"
						disabled
						label="Current School"
						autoFocus
						id="current_school"
						name="current_school"
						value={profile.current_school}
						variant="outlined"
						fullWidth
					/>
				</Grid>
				<Grid item sm={12} md={6}>
					<TextField
						className="mt-8 mb-16"
						disabled
						label="Year"
						id="year"
						name="year"
						value={profile.year}
						variant="outlined"
						fullWidth
					/>
				</Grid>
				<Grid item sm={12} md={6}>
					<TextField
						className="mt-8 mb-16"
						disabled
						label="Position"
						id="position"
						name="position"
						value={profile.position}
						variant="outlined"
						fullWidth
					/>
				</Grid>
				<Grid item sm={12} md={6}>
					<TextField
						className="mt-8 mb-16"
						disabled
						label="Height"
						id="height"
						name="height"
						value={profile.height}
						variant="outlined"
						fullWidth
					/>
				</Grid>
				<Grid item sm={12} md={6}>
					<TextField
						className="mt-8 mb-16"
						disabled
						label="Weight"
						id="weight"
						name="weight"
						value={profile.weight}
						variant="outlined"
						fullWidth
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						className="mt-8 mb-16"
						disabled
						label="HS/College"
						id="hs_college"
						name="hs_college"
						value={profile.hs_college}
						variant="outlined"
						fullWidth
					/>
				</Grid>
				<Grid item sm={12} md={6}>
					<TextField
						className="mt-8 mb-16"
						disabled
						label="ACT"
						id="act"
						name="act"
						value={profile.act}
						variant="outlined"
						fullWidth
					/>
				</Grid>
				<Grid item sm={12} md={6}>
					<TextField
						className="mt-8 mb-16"
						disabled
						label="SAT"
						id="sat"
						name="sat"
						value={profile.sat}
						variant="outlined"
						fullWidth
					/>
				</Grid>
			</Grid>
		</div>
	);
}

export default AboutTab;
