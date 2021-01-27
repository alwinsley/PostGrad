import React, { useEffect, useState } from 'react';
import { 
	GridList,
	GridListTile,
	Grid,
	Icon,
	Fab
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import FuseAnimate from '@fuse/core/FuseAnimate/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';

import FullScreenView from 'app/components/FullScreenView';
import CardTopBar from '../component/CardTopBar';
import ResourceDlg from '../component/ResourceDlg';
import ClickUploader from 'app/components/ClickUploader';

import { asset_path } from '../../../../helpers/resource';

const useStyles = makeStyles((theme) => ({
	button: {
		position: 'absolute',
		right: 12,
		bottom: 30,
		zIndex: 99
	}
}));

const PhotosTab = ({resources, onAddRS, onDeleteRS, onEditRS}) => {
	const classes = useStyles();
	const [isModal, setIsModal] = useState(false);
	const [selected, setSelected] = useState(null);
	const [fullScreen, setFullScreen] = useState(false);
	
	const handleUploadChange = (files) => {
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

	const _photos = resources.filter(re => re.type === 'IMAGE');

	return (
		<div className="md:flex max-w-2xl">
			<div className="flex flex-col flex-1 md:ltr:pr-32 md:rtl:pl-32">
				<FuseAnimateGroup
					enter={{
						animation: 'transition.slideUpBigIn'
					}}
				>
					<Grid sm={12} md={6}>
						<ClickUploader accept="image/*" multiple onChange={handleUploadChange}/>
					</Grid>
					<div className="mb-24"></div>
					<GridList className="" spacing={8} cols={0}>
						{!!resources.length && resources.map((rs, index) => {
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

			{!!_photos.length && 
				<FuseAnimate animation="transition.expandIn" delay={500}>
					<Fab
						color="secondary"
						aria-label="add"
						className={classes.button}
						onClick={() => setFullScreen(true)}
					>
						<Icon>fullscreen</Icon>
					</Fab>
				</FuseAnimate>
			}

			<FullScreenView
				open={fullScreen}
				onClose={() => setFullScreen(false)}
				list={_photos}
			/>
			
		</div>
	);
}

export default PhotosTab;
