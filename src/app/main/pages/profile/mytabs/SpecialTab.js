import React, {useState} from 'react';
import _ from '@lodash';

import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import { 
	GridList,
	GridListTile,
	Icon,
	ListSubheader,
	Typography
} from '@material-ui/core';

import CardTopBar from '../component/CardTopBar';
import ResourceDlg from '../component/ResourceDlg';

import { asset_path } from '../../../../helpers/resource';


const SpecialTab = ({oldResources, resources, tabType, onAddRS, onDeleteRS, onEditRS}) => {
	const [isModal, setIsModal] = useState(false);
	const [selected, setSelected] = useState(null);

	const checkType = (item) => {
		if(tabType === "HIGHLIGHT" && item.highlight) return true;
		if(tabType === "WORKOUT" && item.workout) return true;

		return false;
	}

	const handleOpenModal = (index, resource) => {
		setSelected({...resource, index});
		setIsModal(true);
	}

	const handleCloseModal = () => {
		setIsModal(false);
		setSelected(null);
	}

	const handleChangeResource = (resource) => {
		setIsModal(false);
		onEditRS(resource);
	}

	return (
		<div className="md:flex max-w-2xl">
			<div className="flex flex-col flex-1 md:ltr:pr-32 md:rtl:pl-32">
				<FuseAnimateGroup
					enter={{
						animation: 'transition.slideUpBigIn'
					}}
				>
					<div className="mb-48">
						<ListSubheader component="div" className="flex items-center px-0 mb-24">
							<Typography variant="h6">VIDEOS</Typography>
						</ListSubheader>
						<GridList className="" spacing={8} cols={0}>
							{!!resources.length && resources.map((rs, index) => {
								return checkType(rs) && rs.type === 'VIDEO' ?
									<GridListTile key={`video_${index}`} classes={{ root: 'w-full sm:w-1/2 md:w-1/4', tile: 'rounded-8 shadow'}}>
										<video src={asset_path(rs.url)} controls style={{height: '100%', width: '100%'}}></video>
										<CardTopBar title={rs.description} onEdit={() => handleOpenModal(index, rs)} onDelete={() => onDeleteRS(null, index)}/>
									</GridListTile>
								: null	}		
							)}
							{!!oldResources.length && oldResources.map((rs, index) => {
								return checkType(rs) && rs.type === 'VIDEO' ?
									<GridListTile key={`video_${index}`} classes={{ root: 'w-full sm:w-1/2 md:w-1/4', tile: 'rounded-8 shadow'}}>
										<video src={asset_path(rs.url)} controls style={{height: '100%', width: '100%'}}></video>
										<CardTopBar title={rs.description} onEdit={() => handleOpenModal(index, rs)} onDelete={() => onDeleteRS(rs.id, index)}/>
									</GridListTile>
								: null	}		
							)}
						</GridList>
					</div>
					<div className="mb-48">
						<ListSubheader component="div" className="flex items-center px-0 mb-24">
							<Typography variant="h6">PHOTOS</Typography>
						</ListSubheader>
						<GridList className="" spacing={8} cols={0}>
							{!!resources.length && resources.map((rs, index) => {
								return checkType(rs) && rs.type === 'IMAGE' ?
									<GridListTile key={index} classes={{ root: 'w-full sm:w-1/2 md:w-1/4', tile: 'rounded-8 shadow'}}>
										<img src={asset_path(rs.url)}/>
										<CardTopBar title={rs.description} onEdit={() => handleOpenModal(index, rs)} onDelete={() => onDeleteRS(null, index)}/>
									</GridListTile>
								: null
							})}
							{!!oldResources.length && oldResources.map((rs, index) => {
								return checkType(rs) && rs.type === 'IMAGE' ?
									<GridListTile key={rs.id} classes={{ root: 'w-full sm:w-1/2 md:w-1/4', tile: 'rounded-8 shadow'}}>
										<img src={asset_path(rs.url)}/>
										<CardTopBar title={rs.description} onEdit={() => handleOpenModal(index, rs)} onDelete={() => onDeleteRS(rs.id, index)}/>
									</GridListTile>
								: null
							})}
						</GridList>
					</div>
				</FuseAnimateGroup>
			</div>

			{isModal && 
				<ResourceDlg
					open={isModal}
					resource={selected}
					onClose={handleCloseModal}
					onSave={handleChangeResource}
				/>
			}

		</div>
	);
}

export default SpecialTab;
