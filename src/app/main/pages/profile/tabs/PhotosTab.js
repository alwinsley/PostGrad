import React, { useState } from 'react';
import {
	Fab,
	Icon,
} from '@material-ui/core';

import FuseAnimate from '@fuse/core/FuseAnimate/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';

import FullScreenView from 'app/components/FullScreenView';
import ImageCard from 'app/components/cards/ImageCard';

const PhotosTab = ({resources}) => {
	const [fullScreen, setFullScreen] = useState(false);

	const _photos = resources.filter(re => re.type === 'IMAGE');
	
	return (
		<div className="md:flex w-full">
			<div className="flex flex-col flex-1 md:ltr:pr-32 md:rtl:pl-32">
				<FuseAnimateGroup
					enter={{
						animation: 'transition.slideUpBigIn'
					}}
				>
					<div className="flex flex-wrap">
						{!!_photos.length && _photos.map((rs, index) => 
							<ImageCard
								key={index}
								src={rs.url}
								description={rs.description}
							/>
						)}
					</div>
				</FuseAnimateGroup>
			</div>
			
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
