import React, {useState} from 'react';
import _ from '@lodash';

import { 
	GridList,
	GridListTile,
	Grid,
	Icon,
	Fab,
	Typography
} from '@material-ui/core';

import FuseAnimate from '@fuse/core/FuseAnimate/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';

import CardTopBar from '../component/CardTopBar';
import ResourceDlg from '../component/ResourceDlg';
import LinkUploader from 'app/components/LinkUploader';
import VideoPlayer from 'app/components/VideoPlayer';
import FullScreenView from 'app/components/FullScreenView';
import { asset_path } from '../../../../helpers/resource';

const VideosTab = ({resources, onAddRS, onDeleteRS, onEditRS}) => {
	const [fullScreen, setFullScreen] = useState(false);
	const [isModal, setIsModal] = useState(false);
	const [selected, setSelected] = useState(null);

	const handleUploadChange = (files) => {
		onAddRS(files, "VIDEO");
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

	const _videos = resources.filter(re => re.type === 'VIDEO');

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
							<Typography>Add 1 highlight film and at least 1 workout training video.</Typography>
						</div>
						<div className="w-full mx-auto mb-16 sm:w-320">
							<LinkUploader accept="video/*" multiple onChangeFile={handleUploadChange} onChangeLink={(link) => onAddRS(link, 'LINK')}/>
						</div>
					</div>

					<div className="mb-24"></div>

					<GridList className="" spacing={8} cols={0}>
						{!!resources.length && resources.map((rs, index) => {
							if(rs.type != 'VIDEO') return null;
							return	(
								<GridListTile key={rs.id} classes={{root: 'w-full sm:w-1/2 md:w-1/3 xl:w-1/4', tile: 'rounded-8 shadow'}} style={{height: 'auto'}}>
									<VideoPlayer url={asset_path(rs.url)} style={{height: '100%', width: '100%'}}/>
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

			{!!_videos.length && 
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
				list={_videos}
			/>

		</div>
	);
}

export default VideosTab;
