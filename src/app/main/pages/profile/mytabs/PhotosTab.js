import React, { useEffect, useState } from 'react';
import { 
	GridList,
	GridListTile,
	Grid,
	Icon,
	Fab,
	Typography
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
	},
	instrument: {
		maxWidth: 640,
		textAlign: 'center',
		margin: '0 auto 12px'
	},
	uploader: {
		maxWidth: 250,
		margin: '0 auto 20px'
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
					<div>
						<div className={classes.instrument}>
							<Typography>Please take one picture in a door frame and 1 showing wing span. If available, take door picture next to a tape measure. This wil help coaches verify your height and help with your player ranking.</Typography>
						</div>
						<div className={classes.uploader}>
							<ClickUploader accept="image/*" multiple onChange={handleUploadChange}/>
						</div>
					</div>
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
