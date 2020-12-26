import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from '@lodash';

import FuseScrollbars from '@fuse/core/FuseScrollbars';

import FuseLoading from '@fuse/core/FuseLoading';
import FuseAnimate from '@fuse/core/FuseAnimate/FuseAnimate';
import { 
	Avatar,
	Checkbox,
	Icon,
	Table,
	TableBody,
	TableCell,
	TablePagination,
	TableRow,
	Typography,
	Button,
} from '@material-ui/core';

import CoachesTableHead from './CoachesTableHead';
import MultiMessageDlg from '../component/MultiMessageDlg';
import { getCoachs, selectCoachs } from '../store/coachsSlice';
import { asset_path } from '../../../helpers/resource';

const actionStyles = {
	btn: {
		padding: '6px',
		minWidth: "36px",
		margin: "0 10px",
	},
	btnGreen: {
		backgroundColor: "#0fad3d"
	},
	btnInfo: {
		backgroundColor: "#0c8caf"
	},
	icon: {
		margin: '0',
		color: "white"
	}
};

const CoachesTable = (props) => {
	const dispatch = useDispatch();
	const users = useSelector(selectCoachs);
	const searchText = useSelector(({ UsersPage }) => UsersPage.coachs.searchText);

	const [data, setData] = useState(users);
	const [receivers, setReceivers] = useState([]);

	const [loading, setLoading] = useState(false);
	const [selected, setSelected] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});

	useEffect(() => {
		dispatch(getCoachs()).then(() => setLoading(false));
	}, [dispatch]);

	useEffect(() => {
		if (searchText.length !== 0) {
			setData(_.filter(users, item => item.name.toLowerCase().includes(searchText.toLowerCase())));
			setPage(0);
		} else {
			setData(users);
		}
	}, [users, searchText]);

	useEffect(() => {
		if(props.isModal && selected.length) {
			let _nameList = [];
			_.each(data, item => {
				if(selected.indexOf(item.id) > -1) _nameList.push({value: item.id, label: item.name});
			});
			setReceivers(_nameList);
		}else{
			setReceivers([]);
		}
	}, [props.isModal]);

	function handleRequestSort(event, property) {
		const id = property;
		let direction = 'desc';

		if (order.id === property && order.direction === 'desc') {
			direction = 'asc';
		}

		setOrder({
			direction,
			id
		});
	}

	function handleSelectAllClick(event) {
		if (event.target.checked) {
			setSelected(users.map(n => n.id));
			return;
		}
		setSelected([]);
	}

	function handleDeselect() {
		setSelected([]);
	}

	const openMessageModal = (id) => {
		setSelected([id]);
		
		props.handleModal(true);
	}
	const handleSendMessage = (id) => {
		alert("message sent successfully");
	}

	const handleViewDetail = (id) => {
		const { history } = props;

		history.push(`profile/${id}`);
	}

	function handleCheck(event, id) {
		const selectedIndex = selected.indexOf(id);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
		}

		setSelected(newSelected);
	}

	function handleChangePage(event, value) {
		setPage(value);
	}

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(event.target.value);
	}

	if (loading) {
		return <FuseLoading />;
	}

	if (data.length === 0) {
		return (
			<FuseAnimate delay={100}>
				<div className="flex flex-1 items-center justify-center h-full">
					<Typography color="textSecondary" variant="h5">
						There are no coaches!
					</Typography>
				</div>
			</FuseAnimate>
		);
	}

	return (
		<div className="w-full flex flex-col">
			<FuseScrollbars className="flex-grow overflow-x-auto">
				<Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
					<CoachesTableHead
						selectedCoachIds={selected}
						order={order}
						onSelectAllClick={handleSelectAllClick}
						onRequestSort={handleRequestSort}
						rowCount={data.length}
						onMenuItemClick={handleDeselect}
					/>

					<TableBody>
						{
							_.orderBy(
								data,
								[
									o => {
										switch (order.id) {
											case 'categories': {
												return o.categories[0];
											}
											default: {
												return o[order.id];
											}
										}
									}
								],
								[order.direction]
							).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map(n => {
								const isSelected = selected.indexOf(n.id) !== -1;
								return (
									<TableRow
										className="h-64 cursor-pointer"
										hover
										role="checkbox"
										aria-checked={isSelected}
										tabIndex={-1}
										key={n.id}
										selected={isSelected}
									>
										<TableCell className="w-40 md:w-64 text-center" padding="none">
											<Checkbox
												checked={isSelected}
												onClick={event => event.stopPropagation()}
												onChange={event => handleCheck(event, n.id)}
											/>
										</TableCell>

										<TableCell
											className="w-52 px-4 md:px-0"
											component="th"
											scope="row"
											padding="none"
										>
											<Avatar
												className="w-50 h-50"
												alt="user photo"
												src={ n.avatar && n.avatar !== '' ? asset_path(n.avatar) : 'assets/images/avatars/profile.jpg'	}
											/>
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row">{n.name}</TableCell>
										<TableCell className="p-4 md:p-16" component="th" scope="row">{n.email}</TableCell>
										<TableCell className="p-4 md:p-16" component="th" scope="row">{n.phone}</TableCell>
										<TableCell className="p-4 md:p-16" component="th" scope="row">{n.city}</TableCell>
										<TableCell className="p-4 md:p-16" component="th" scope="row">{n.state}</TableCell>
										<TableCell className="p-4 md:p-16" component="th" scope="row">{n.current_school}</TableCell>
										<TableCell className="p-4 md:p-16" component="th" scope="row">{n.height}</TableCell>
										<TableCell className="p-4 md:p-16" component="th" scope="row">{n.weight}</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row">
											<div style={{minWidth: "112px"}}>
												<Button style={{...actionStyles.btn, ...actionStyles.btnGreen}} variant="contained" onClick={() => handleViewDetail(n.id)}>
													<Icon style={actionStyles.icon} className="text-green text-20">remove_red_eye</Icon>
												</Button>
												<Button style={{...actionStyles.btn, ...actionStyles.btnInfo}} variant="contained" onClick={() => openMessageModal(n.id)}>
													<Icon style={actionStyles.icon} className="text-green text-20">message</Icon>
												</Button>
											</div>
										</TableCell>
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</FuseScrollbars>

			<TablePagination
				className="flex-shrink-0 border-t-1"
				component="div"
				count={data.length}
				rowsPerPage={rowsPerPage}
				page={page}
				backIconButtonProps={{
					'aria-label': 'Previous Page'
				}}
				nextIconButtonProps={{
					'aria-label': 'Next Page'
				}}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
			/>

			{props.isModal && (
				<MultiMessageDlg receivers={receivers} open={props.isModal} onClose={() => props.handleModal(false)} />
			)}
		</div>
	);
}

export default withRouter(CoachesTable);
