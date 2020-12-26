import React, { useEffect, useState } from 'react';
import { useForm, useDeepCompareEffect } from '@fuse/hooks';
import {
	Grid,
	TextField,
} from '@material-ui/core';


const InfoTab = ({profile}) => {
	console.log(profile);
	
	return (
		<div className="md:flex max-w-2xl">
			<Grid container spacing={3}>
				<Grid item sm={12} md={6}>
					<TextField
						className="mt-8 mb-16"
						disabled
						label="Name"
						autoFocus
						id="name"
						name="name"
						value={profile.name}
						variant="outlined"
						fullWidth
					/>
				</Grid>
				<Grid item sm={12} md={6}>
					<TextField
						className="mt-8 mb-16"
						disabled
						label="Email"
						id="email"
						name="email"
						value={profile.email}
						variant="outlined"
						fullWidth
					/>
				</Grid>
				<Grid item sm={12} md={6}>
					<TextField
						className="mt-8 mb-16"
						disabled
						label="Phone Number"
						id="phone"
						name="phone"
						value={profile.phone}
						variant="outlined"
						fullWidth
					/>
				</Grid>
				<Grid item sm={12} md={6}>
					<TextField
						className="mt-8 mb-16"
						disabled
						label="City"
						id="city"
						name="city"
						value={profile.city}
						variant="outlined"
						fullWidth
					/>
				</Grid>
				<Grid item sm={12} md={6}>
					<TextField
						className="mt-8 mb-16"
						disabled
						label="State"
						id="state"
						name="state"
						value={profile.state}
						variant="outlined"
						fullWidth
					/>
				</Grid>
				<Grid item sm={12} md={6}>
					<TextField
						className="mt-8 mb-16"
						disabled
						label="Zip"
						id="zipcode"
						name="zipcode"
						value={profile.zipcode}
						variant="outlined"
						fullWidth
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						className="mt-8 mb-16"
						disabled
						label="Twitter"
						id="twitter"
						name="twitter"
						value={profile.twitter}
						variant="outlined"
						fullWidth
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						className="mt-8 mb-16"
						disabled
						label="Description"
						multiline
          				rows={4}
						id="description"
						name="description"
						value={profile.description}
						variant="outlined"
						fullWidth
					/>
				</Grid>
			</Grid>
		</div>
	);
}

export default InfoTab;
