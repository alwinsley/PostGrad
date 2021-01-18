import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import _ from '@lodash';

import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import { 
	Fab,
	Icon,
	Typography,
} from '@material-ui/core';


import PermissionCard from 'app/components/cards/PermissionCard';
import { CircleFullSpinner } from 'app/components/Spinner';

import { getUserPermission } from 'app/helpers/functions';
import { postSubscription } from 'app/services/permission_api';

const MembershipContent = ({loading, memberships, permissions, onChangeStatus, ...props}) => {
	const me = useSelector(({ auth }) => auth.user);
	
	const handleAction = (type, payload) => {
		postSubscription(payload).then(res => {
			window.location.reload();
		}).catch(err => {
			console.log(err);
		})
	}

	if (memberships.length === 0 || permissions.length == 0) {
		return null;
	}

	return (
		<div className="w-full h-full relative">
			<FuseAnimateGroup
				enter={{animation: 'transition.slideUpBigIn'}}
				className="flex flex-wrap p-24"
			>
				{permissions.map((permission, index) => 
					<div className="w-full pb-24 sm:w-1/2 lg:w-1/3 sm:p-16" key={index}>
						<PermissionCard
							userpermission={getUserPermission(me.permissions, permission)}
							permission={permission}
							onTriggeredAction={handleAction}/>
					</div>
				)}	
			</FuseAnimateGroup>

			{loading && <CircleFullSpinner />}
		</div>
	);
}

export default withRouter(MembershipContent);
