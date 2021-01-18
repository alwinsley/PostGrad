import React, { useState } from 'react';

import {
	Checkbox,
	Icon,
	IconButton,
	Menu,
	MenuItem
} from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';


function MailToolbar({checkstatus, onChangeSelectAll, onDelete, ...props}) {
	const dispatch = useDispatch();

	const [menu, setMenu] = useState({
		selectMenu: null,
		foldersMenu: null,
		labelsMenu: null
	});

	function handleMenuOpen(event, _menu) {
		setMenu({
			..._menu,
			[_menu]: event.currentTarget
		});
	}

	function handleMenuClose(event, _menu) {
		setMenu({
			..._menu,
			[_menu]: null
		});
	}

	const handleCheckChange = () => {
		let _status = checkstatus === 'all' ? 'none' : 'all'; 
		onChangeSelectAll(_status);
	}

	return (
		<div className="flex flex-1 items-center sm:px-8">
			<Checkbox
				onChange={handleCheckChange}
				checked={checkstatus === 'all'}
				indeterminate={checkstatus === 'some'}
			/>

			{/* <IconButton
				className=""
				size="small"
				aria-label="More"
				aria-owns={menu.select ? 'select-menu' : null}
				aria-haspopup="true"
				onClick={ev => handleMenuOpen(ev, 'select')}
			>
				<Icon>arrow_drop_down</Icon>
			</IconButton>

			<Menu
				id="select-menu"
				anchorEl={menu.select}
				open={Boolean(menu.select)}
				onClose={ev => handleMenuClose(ev, 'select')}
			>
				<MenuItem
					onClick={ev => {
						dispatch(selectAllMails());
						handleMenuClose(ev, 'select');
					}}
				>
					All
				</MenuItem>
				<MenuItem
					onClick={ev => {
						dispatch(deselectAllMails());
						handleMenuClose(ev, 'select');
					}}
				>
					None
				</MenuItem>
				<MenuItem
					onClick={ev => {
						dispatch(selectMailsByParameter(['read', true]));
						handleMenuClose(ev, 'select');
					}}
				>
					Read
				</MenuItem>
				<MenuItem
					onClick={ev => {
						dispatch(selectMailsByParameter(['read', false]));
						handleMenuClose(ev, 'select');
					}}
				>
					Unread
				</MenuItem>
			</Menu> */}

			{(checkstatus === 'all' || checkstatus === 'some') && (
				<>
					<div className="border-r-1 h-48 w-1 mx-12 my-0" />

					<IconButton onClick={onDelete} aria-label="Delete">
						<Icon>delete</Icon>
					</IconButton>

					{/* <IconButton
						aria-label="More"
						aria-owns={menu.folders ? 'folders-menu' : null}
						aria-haspopup="true"
						onClick={ev => handleMenuOpen(ev, 'folders')}
					>
						<Icon>folder</Icon>
					</IconButton>

					<Menu
						id="folders-menu"
						anchorEl={menu.folders}
						open={Boolean(menu.folders)}
						onClose={ev => handleMenuClose(ev, 'folders')}
					>
						{folders.length > 0 &&
							folders.map(folder => (
								<MenuItem
									onClick={ev => {
										dispatch(setFolderOnSelectedMails(folder.id));
										handleMenuClose(ev, 'folders');
									}}
									key={folder.id}
								>
									{folder.title}
								</MenuItem>
							))}
					</Menu>

					<IconButton
						aria-label="More"
						aria-owns={menu.labels ? 'labels-menu' : null}
						aria-haspopup="true"
						onClick={ev => handleMenuOpen(ev, 'labels')}
					>
						<Icon>label</Icon>
					</IconButton>

					<Menu
						id="folders-menu"
						anchorEl={menu.labels}
						open={Boolean(menu.labels)}
						onClose={ev => handleMenuClose(ev, 'labels')}
					>
						{labels.length > 0 &&
							labels.map(label => (
								<MenuItem
									onClick={ev => {
										dispatch(toggleLabelOnSelectedMails(label.id));
										handleMenuClose(ev, 'labels');
									}}
									key={label.id}
								>
									{label.title}
								</MenuItem>
							))}
					</Menu> */}
				</>
			)}
		</div>
	);
}

export default MailToolbar;
