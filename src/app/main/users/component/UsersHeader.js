import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import FuseAnimate from '@fuse/core/FuseAnimate';
import { 
	Fab,
	Icon,
	Input,
	Paper,
	Typography,
} from '@material-ui/core';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';

const useStyles = makeStyles((theme) => ({
	addButton: {
		position: 'absolute',
		right: 12,
		top: 45,
		zIndex: 99
	}
}));

function UsersHeader({title, onChangeSearch, onCreateUser, ...props}) {
	const mainTheme = useSelector(selectMainTheme);
	const classes = useStyles();
	const me = useSelector(({ auth }) => auth.user);
	const [searchText, setSearchText] = useState('');

	const onChangeSearchText = (e) => {
		const { value } = e.target;
		setSearchText(value);

		if(!value) onChangeSearch('');
	}

	const handleSearch = (e) => {
		const { keyCode } = e;
		if(keyCode !== 13) return;
		
		onChangeSearch(searchText);
	}

	return (
		<div className="flex flex-1 items-center justify-between p-4 sm:p-24">
			<div className="flex flex-shrink items-center sm:w-224">
				<div className="flex items-center">
					<FuseAnimate animation="transition.expandIn" delay={300}>
						<Icon className="text-32">supervisor_account</Icon>
					</FuseAnimate>
					<FuseAnimate animation="transition.slideLeftIn" delay={300}>
						<Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
							{title}
						</Typography>
					</FuseAnimate>
				</div>
			</div>

			<div className="flex flex-1 items-center justify-center px-8 sm:px-12">
				<ThemeProvider theme={mainTheme}>
					<FuseAnimate animation="transition.slideLeftIn" delay={300}>
						<Paper className="flex p-4 items-center w-full max-w-512 h-48 px-8 py-4 rounded-8 shadow">
							<Icon color="action">search</Icon>

							<Input
								placeholder="Search..."
								className="flex flex-1 px-16"
								disableUnderline
								fullWidth
								value={searchText}
								inputProps={{
									'aria-label': 'Search'
								}}
								onChange={onChangeSearchText}
								onKeyDown={handleSearch}
							/>
						</Paper>
					</FuseAnimate>
				</ThemeProvider>
			</div>
			
			{me.role === 'ADMIN' && 
				<FuseAnimate animation="transition.expandIn" delay={500}>
					<Fab
						color="secondary"
						aria-label="add"
						className={classes.addButton}
						onClick={onCreateUser}
					>
						<Icon>add</Icon>
					</Fab>
				</FuseAnimate>
			}
		</div>

		
	);
}

export default UsersHeader;
