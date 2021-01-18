import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import {
	Hidden,
	Icon,
	IconButton,
	Input,
	Paper
} from '@material-ui/core';

import { ThemeProvider } from '@material-ui/core/styles';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';

const MailAppHeader = ({ onChangeSearch, ...props}) => {
	const mainTheme = useSelector(selectMainTheme);
	const { t } = useTranslation('mailApp');

	const [searchText, setSearchText] = useState('');

	const handleChangeSearch = (e) => {
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
		<ThemeProvider theme={mainTheme}>
			<div className="flex flex-1">
				<Paper className="flex items-center w-full h-48 sm:h-56 p-16 ltr:pl-4 lg:ltr:pl-16 rtl:pr-4 lg:rtl:pr-16 rounded-8 shadow">
					<Hidden lgUp>
						<IconButton
							onClick={ev => props.pageLayout.current.toggleLeftSidebar()}
							aria-label="open left sidebar"
						>
							<Icon>menu</Icon>
						</IconButton>
					</Hidden>

					<Icon color="action">search</Icon>

					<Input
						placeholder={t('SEARCH_PLACEHOLDER')}
						className="px-16"
						disableUnderline
						fullWidth
						value={searchText}
						inputProps={{
							'aria-label': 'Search'
						}}
						onChange={handleChangeSearch}
						onKeyDown={handleSearch}
					/>
				</Paper>
			</div>
		</ThemeProvider>
	);
}

export default MailAppHeader;
