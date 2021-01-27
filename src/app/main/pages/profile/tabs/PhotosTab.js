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

import FullScreenView from 'app/components/FullScreenView';
import CardTopBar from '../component/CardTopBar';
import { asset_path } from 'app/helpers/resource';

const useStyles = makeStyles((theme) => ({
	button: {
		position: 'absolute',
		right: 12,
		bottom: 30,
		zIndex: 99
	}
}));

const PhotosTab = ({resources}) => {
	const classes = useStyles();
	const [fullScreen, setFullScreen] = useState(false);

	const _photos = resources.filter(re => re.type === 'IMAGE');
	
	return (
		<div className="md:flex max-w-2xl">
			<div className="flex flex-col flex-1 md:ltr:pr-32 md:rtl:pl-32">
				<FuseAnimateGroup
					enter={{
						animation: 'transition.slideUpBigIn'
					}}
				>
					<GridList className="" spacing={8} cols={0}>
						{!!_photos.length && _photos.map((rs, index) => {
							if(rs.type !== 'IMAGE') return null;
							return (
								<GridListTile key={index} classes={{ root: 'w-full sm:w-1/2 md:w-1/4', tile: 'rounded-8 shadow'}}>
									<img src={asset_path(rs.url)}/>
									<CardTopBar title={rs.description} disabled/>
								</GridListTile>
							)
						})}
					</GridList>
				</FuseAnimateGroup>
			</div>
			
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
