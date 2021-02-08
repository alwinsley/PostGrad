import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import _ from '@lodash';

import FuseAnimate from '@fuse/core/FuseAnimate/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import { 
	Card,
	CardHeader,
	CardContent,
	IconButton,
	Icon,
	Typography,
} from '@material-ui/core';

import { asset_path } from 'app/helpers/resource';
import { dateString } from 'app/helpers/functions';
import { CircleFullSpinner } from 'app/components/Spinner';
import { RedIconBtn } from 'app/components/ColorBtns'

const ArticleContent = ({loading, data, onDelete, ...props}) => {
	const me = useSelector(({ auth }) => auth.user);
	
	if (data.length === 0) {
		return (
			<FuseAnimate delay={100}>
				<div className="flex flex-1 items-center justify-center h-full">
					<Typography color="textSecondary" variant="h5">
						There are no News!
					</Typography>
				</div>
			</FuseAnimate>
		);
	}

	return (
		<div className="w-full h-full relative max-w-lg">
			<FuseAnimateGroup
				enter={{animation: 'transition.slideUpBigIn'}}
				className="p-24"
			>
				{data.map(post => (
					<Card key={post.id} className="mb-32 overflow-hidden rounded-8 shadow">
						<CardHeader
							action={
								me.role === 'ADMIN' ? <RedIconBtn onClick={() => onDelete(post)}><Icon>delete</Icon></RedIconBtn> : null
							}
							title={
								<span className="flex">
									<Typography variant="h6" className="font-medium" color="primary" paragraph={false}>
										{post.title}
									</Typography>
								</span>
							}
							subheader={dateString(post.created_at)}
						/>

						<CardContent className="py-0">
							{post.content && (
								<Typography component="p" className="mb-16">
									{post.content}
								</Typography>
							)}

							{post.image && <img className="w-full" src={asset_path(post.image)} alt="post" />}
						</CardContent>
					</Card>
				))}
			</FuseAnimateGroup>

			{loading && <CircleFullSpinner />}
		</div>
	);
}

export default withRouter(ArticleContent);
