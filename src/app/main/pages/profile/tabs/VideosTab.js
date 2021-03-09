import React, { useEffect, useState } from 'react';
import {
	Fab,
	Icon,
	GridList,
	GridListTile
} from '@material-ui/core';

import FuseAnimate from '@fuse/core/FuseAnimate/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';

import CardTopBar from '../component/CardTopBar';
import VideoPlayer from 'app/components/VideoPlayer';
import FullScreenView from 'app/components/FullScreenView';
import { asset_path } from '../../../../helpers/resource';

const VideosTab = ({resources}) => {
	const [videos, setVideos] = useState([]);
	const [fullScreenVideos, setFullScreenVideos] = useState([]);

	useEffect(() => {
		const _videos = resources.filter(re => re.type === 'VIDEO');
		setVideos(_videos);
	}, [resources]);
	
	const handleFullScreen = (index) => {
		let _videos = videos.slice(index);
		if(index > 0){
			_videos = [..._videos, ...videos.slice(0, index)]
		}
		setFullScreenVideos(_videos);
	}

	return (
		<div className="md:flex w-full">
			<div className="flex flex-col flex-1 md:ltr:pr-32 md:rtl:pl-32">
				<FuseAnimateGroup
					enter={{
						animation: 'transition.slideUpBigIn'
					}}
				>
					<GridList className="" spacing={8} cols={0}>
						{!!videos.length && videos.map((rs, index) => 
							<GridListTile key={index} classes={{ root: 'w-full md:w-1/3 lg:w-1/4', tile: 'rounded-8 shadow'}} style={{height: 'auto'}}>
								<VideoPlayer
									url={asset_path(rs.url)}
									style={{height: '100%', width: '100%'}}
									onClick={() => handleFullScreen(index)}
								/>
								<CardTopBar title={rs.description} disabled/>
							</GridListTile>
						)}
					</GridList>
				</FuseAnimateGroup>
			</div>

			{!!videos.length && 
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
				open={!!fullScreenVideos.length}
				onClose={() => setFullScreenVideos([])}
				list={fullScreenVideos}
			/>
		</div>
	);
}

export default VideosTab;
