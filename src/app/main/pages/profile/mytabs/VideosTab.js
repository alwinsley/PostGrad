import React, {useState} from 'react';
import _ from '@lodash';

import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import { 
	GridList,
	GridListTile,
	Grid,
	Icon,
} from '@material-ui/core';
import CardTopBar from '../component/CardTopBar';
import ResourceDlg from '../component/ResourceDlg';
import LinkUploader from 'app/components/LinkUploader';
import VideoPlayer from 'app/components/VideoPlayer';

import { asset_path } from '../../../../helpers/resource';

const VideosTab = ({oldResources, resources, onAddRS, onDeleteRS, onEditRS}) => {
	const [isModal, setIsModal] = useState(false);
	const [selected, setSelected] = useState(null);

	const handleUploadChange = (files) => {
		onAddRS(files, "VIDEO");
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
					<Grid sm={12} md={6}>
						<LinkUploader accept="video/*" multiple onChangeFile={handleUploadChange} onChangeLink={(link) => onAddRS(link, 'LINK')}/>
					</Grid>
					<div className="mb-24"></div>

					<GridList className="" spacing={8} cols={0}>
						{!!resources.length && resources.map((rs, index) => {
							if(rs.type !== 'VIDEO') return null;
							return (
								<GridListTile key={index} classes={{ root: 'w-full sm:w-1/2 md:w-1/4', tile: 'rounded-8 shadow'}}>
									<VideoPlayer url={asset_path(rs.url)} style={{height: '100%', width: '100%'}}/>
									<CardTopBar title={rs.description} onEdit={() => handleOpenModal(index, rs)} onDelete={() => onDeleteRS(null, index)}/>
								</GridListTile>
							)
						})}
						{!!oldResources.length && oldResources.map((rs, index) => {
							if(rs.type != 'VIDEO') return null;
							return	(
								<GridListTile key={rs.id} classes={{root: 'w-full sm:w-1/2 md:w-1/4', tile: 'rounded-8 shadow'}}>
									<VideoPlayer url={asset_path(rs.url)} style={{height: '100%', width: '100%'}}/>
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

export default VideosTab;
