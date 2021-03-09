import React, { useEffect, useState } from 'react';
import {
	Fab,
	Icon,
} from '@material-ui/core';

import FuseAnimate from '@fuse/core/FuseAnimate/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';

import FullScreenView from 'app/components/FullScreenView';
import ImageCard from 'app/components/cards/ImageCard';

const PhotosTab = ({resources}) => {
	const [photos, setPhotos] = useState([]);
	const [fullScreenPhotos, setFullScreenPhotos] = useState([]);

	useEffect(() => {
		const _photos = resources.filter(re => re.type === 'IMAGE');
		setPhotos(_photos);
	}, [resources]);
	
	const handleFullScreen = (index) => {
		let _photos = photos.slice(index);
		if(index > 0){
			_photos = [..._photos, ...photos.slice(0, index)]
		}
		setFullScreenPhotos(_photos);
	}
	
	return (
		<div className="md:flex w-full">
			<div className="flex flex-col flex-1 md:ltr:pr-32 md:rtl:pl-32">
				<FuseAnimateGroup
					enter={{
						animation: 'transition.slideUpBigIn'
					}}
				>
					<div className="flex flex-wrap">
						{!!photos.length && photos.map((rs, index) => 
							<ImageCard
								key={index}
								src={rs.url}
								description={rs.description}
								onClickImage={() => handleFullScreen(index)}
							/>
						)}
					</div>
				</FuseAnimateGroup>
			</div>
			
			{!!photos.length && 
				<FuseAnimate animation="transition.expandIn" delay={500}>
					<Fab
						color="secondary"
						aria-label="add"
						className="fixed bottom-56 right-12 sm:bottom-76 sm:right-24"
						onClick={() => handleFullScreen(0)}
					>
						<Icon>fullscreen</Icon>
					</Fab>
				</FuseAnimate>
			}

			<FullScreenView
				open={!!fullScreenPhotos.length}
				onClose={() => setFullScreenPhotos([])}
				list={fullScreenPhotos}
			/>
		</div>
	);
}

export default PhotosTab;
