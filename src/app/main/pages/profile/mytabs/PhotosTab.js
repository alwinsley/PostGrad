import React, { useEffect, useState } from 'react';

import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import { 
	GridList,
	GridListTile,
	Icon,
} from '@material-ui/core';
import CardTopBar from '../component/CardTopBar';
import ResourceDlg from '../component/ResourceDlg';

import { asset_path } from '../../../../helpers/resource';

const PhotosTab = ({oldResources, resources, onAddRS, onDeleteRS, onEditRS}) => {
	const [isModal, setIsModal] = useState(false);
	const [selected, setSelected] = useState(null);
	
	function handleUploadChange(e) {
		const { files } = e.target;
		onAddRS(files, "IMAGE");
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
					<label	htmlFor="image-file" className="flex items-center justify-center relative w-128 h-128 rounded-8 mx-8 mb-16 overflow-hidden cursor-pointer shadow hover:shadow-lg">
						<input accept="image/*"	className="hidden" id="image-file"	type="file" multiple onChange={handleUploadChange}/>
						<Icon fontSize="large" color="action">
							cloud_upload
						</Icon>
					</label>

					<GridList className="" spacing={8} cols={0}>
						{!!resources.length && resources.map((rs, index) => {
							if(rs.type !== 'IMAGE') return null;
							return (
								<GridListTile key={index} classes={{ root: 'w-full sm:w-1/2 md:w-1/4', tile: 'rounded-8 shadow'}}>
									<img src={asset_path(rs.url)}/>
									<CardTopBar title={rs.description} onEdit={() => handleOpenModal(index, rs)} onDelete={() => onDeleteRS(null, index)}/>
								</GridListTile>
							)
						})}
						{!!oldResources.length && oldResources.map((rs, index) => {
							if(rs.type !== 'IMAGE') return null;
							return (
								<GridListTile key={rs.id} classes={{ root: 'w-full sm:w-1/2 md:w-1/4', tile: 'rounded-8 shadow'}}>
									<img src={asset_path(rs.url)}/>
									<CardTopBar title={rs.description} onEdit={() => handleOpenModal(index, rs)} onDelete={() => onDeleteRS(rs.id, index)}/>
								</GridListTile>
							)
						})}
					</GridList>
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

export default PhotosTab;
