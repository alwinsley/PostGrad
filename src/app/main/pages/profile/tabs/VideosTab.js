import React, { useState } from 'react';
import {
	Fab,
	Icon,
	GridList,
	GridListTile
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import FuseAnimate from '@fuse/core/FuseAnimate/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';

import CardTopBar from '../component/CardTopBar';
import VideoPlayer from 'app/components/VideoPlayer';
import FullScreenView from 'app/components/FullScreenView';
import { asset_path } from '../../../../helpers/resource';

const useStyles = makeStyles((theme) => ({
	button: {
		position: 'absolute',
		right: 12,
		bottom: 30,
		zIndex: 99
	}
}));

const VideosTab = ({resources}) => {
	const classes = useStyles();
	const [fullScreen, setFullScreen] = useState(false);

	const _videos = resources.filter(re => re.type === 'VIDEO');

	return (
		<div className="md:flex w-full">
			<div className="flex flex-col flex-1 md:ltr:pr-32 md:rtl:pl-32">
				<FuseAnimateGroup
					enter={{
						animation: 'transition.slideUpBigIn'
					}}
				>
					<GridList className="" spacing={8} cols={0}>
						{!!_videos.length && _videos.map((rs, index) => 
							<GridListTile key={index} classes={{ root: 'w-full md:w-1/3 lg:w-1/4', tile: 'rounded-8 shadow'}} style={{height: 'auto'}}>
								<VideoPlayer url={asset_path(rs.url)} style={{height: '100%', width: '100%'}}/>
								<CardTopBar title={rs.description} disabled/>
							</GridListTile>
						)}
					</GridList>
				</FuseAnimateGroup>
			</div>

			{!!_videos.length && 
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
				list={_videos}
			/>
		</div>
	);
}

export default VideosTab;
