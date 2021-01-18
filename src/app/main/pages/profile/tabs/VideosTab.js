import React from 'react';

import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import CardTopBar from '../component/CardTopBar';
import VideoPlayer from 'app/components/VideoPlayer';
import { asset_path } from '../../../../helpers/resource';

const VideosTab = ({resources}) => {
	
	return (
		<div className="md:flex max-w-2xl">
			<div className="flex flex-col flex-1 md:ltr:pr-32 md:rtl:pl-32">
				<FuseAnimateGroup
					enter={{
						animation: 'transition.slideUpBigIn'
					}}
				>
					<GridList className="" spacing={8} cols={0}>
						{!!resources.length && resources.map((rs, index) => {
							if(rs.type !== 'VIDEO') return null;
							return (
								<GridListTile key={index} classes={{ root: 'w-full sm:w-1/2 md:w-1/4', tile: 'rounded-8 shadow'}}>
									<VideoPlayer url={asset_path(rs.url)} style={{height: '100%', width: '100%'}}/>
									<CardTopBar title={rs.description} disabled/>
								</GridListTile>
							)
						})}
					</GridList>
				</FuseAnimateGroup>
			</div>
		</div>
	);
}

export default VideosTab;
