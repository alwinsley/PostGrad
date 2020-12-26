import React from 'react';

import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography';

import CardTopBar from '../component/CardTopBar';
import { asset_path } from '../../../../helpers/resource';

const SpecialTab = ({resources, tabType}) => {

	const checkType = (item) => {
		if(tabType === "HIGHLIGHT" && item.highlight) return true;
		if(tabType === "WORKOUT" && item.workout) return true;

		return false;
	}

	return (
		<div className="md:flex max-w-2xl">
			<div className="flex flex-col flex-1 md:ltr:pr-32 md:rtl:pl-32">
				<FuseAnimateGroup
					enter={{
						animation: 'transition.slideUpBigIn'
					}}
				>
					<div className="mb-48">
						<ListSubheader component="div" className="flex items-center px-0 mb-24">
							<Typography variant="h6">VIDEOS</Typography>
						</ListSubheader>
						<GridList className="" spacing={8} cols={0}>
							{!!resources.length && resources.map((rs, index) => {
								return checkType(rs) && rs.type === 'VIDEO' ?
									<GridListTile key={`video_${index}`} classes={{ root: 'w-full sm:w-1/2 md:w-1/4', tile: 'rounded-8 shadow'}}>
										<video src={asset_path(rs.url)} controls style={{height: '100%', width: '100%'}}></video>
										<CardTopBar title={rs.description} disabled/>
									</GridListTile>
								: null	}		
							)}
						</GridList>
					</div>
					<div className="mb-48">
						<ListSubheader component="div" className="flex items-center px-0 mb-24">
							<Typography variant="h6">PHOTOS</Typography>
						</ListSubheader>
						<GridList className="" spacing={8} cols={0}>
							{!!resources.length && resources.map((rs, index) => {
								return checkType(rs) && rs.type === 'IMAGE' ?
									<GridListTile key={index} classes={{ root: 'w-full sm:w-1/2 md:w-1/4', tile: 'rounded-8 shadow'}}>
										<img src={asset_path(rs.url)}/>
										<CardTopBar title={rs.description} disabled/>
									</GridListTile>
								: null
							})}
						</GridList>
					</div>
				</FuseAnimateGroup>
			</div>
		</div>
	);
}

export default SpecialTab;
