import React, { useState } from 'react';
import { 
	Icon,
	Fab,
	Typography
} from '@material-ui/core';

import FuseAnimate from '@fuse/core/FuseAnimate/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';

import FullScreenView from 'app/components/FullScreenView';
import ResourceDlg from '../component/ResourceDlg';
import ClickUploader from 'app/components/ClickUploader';
import ImageCard from 'app/components/cards/ImageCard';

const PhotosTab = ({resources, onAddRS, onDeleteRS, onEditRS}) => {
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
		<div className="md:flex w-full">
			<div className="flex flex-col flex-1 md:ltr:pr-32 md:rtl:pl-32">
				<FuseAnimateGroup
					enter={{
						animation: 'transition.slideUpBigIn'
					}}
				>
					<div>
						<div className="max-w-md text-center mx-auto mb-12">
							<Typography>Please take one picture in a door frame and 1 showing wing span. If available, take door picture next to a tape measure. This wil help coaches verify your height and help with your player ranking.</Typography>
						</div>
						<div className="w-full mx-auto mb-16 sm:w-320">
							<ClickUploader accept="image/*" allows="( jpg, png, svg, gif )" multiple onChange={handleUploadChange}/>
						</div>
					</div>
					<div className="flex flex-wrap">
						{!!_photos.length && _photos.map((rs, index) => 
							<ImageCard
								key={index}
								src={rs.url}
								description={rs.description}
								onEdit={() => handleOpenModal(index, rs)}
								onDelete={() => onDeleteRS(rs.id, index)}
							/>
						)}
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

			{!!_photos.length && 
				<FuseAnimate animation="transition.expandIn" delay={500}>
					<Fab
						color="secondary"
						aria-label="add"
						className="fixed bottom-56 right-12 sm:bottom-76 sm:right-24"
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
